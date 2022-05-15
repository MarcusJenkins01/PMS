const sanitize = require('mongo-sanitize');
const router = require('express').Router();
const dotenv = require('dotenv');
const jwtMiddleware = require('../middlewares/jwt.middleware');

const ParkingSpace = require('../models/parkingSpace.model');
const ParkingLot = require('../models/parkingLot.model');
const Account = require('../models/account.model');
const BookingRequest = require('../models/bookingRequest.model');
const Booking = require('../models/booking.model');
const mongoose = require('mongoose');
const mailer = require('../middlewares/nodemailer.middleware');

dotenv.config();

router.use(jwtMiddleware);

// router.route('/spaces/:lotid').get(async (req, res) => {
//   let lotID = sanitize(req.params.lotid);

//   ParkingSpace.find({ parking_lot_id: mongoose.Types.ObjectId(lotID) })
//   .then(data => {
//     res.send(data);
//   })
//   .catch(e => {
//     res.send({ err: true, info: "Database error" });
//   });
// });

router.route('/lotdata').get(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  ParkingLot.aggregate([
    {
      $lookup: {
        "from": "parkingspaces",
        "localField": "_id",
        "foreignField": "parking_lot_id",
        pipeline: [
          {
            $lookup: {
              from: "bookings",
              localField: "_id",
              foreignField: "space_id",
              as: "bookings"
            }
          }
        ],
        "as": "spaces"
      }
    }
  ]).then(dbRes => {
    res.send(dbRes);
  }).catch(e => {
    console.log(e)
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/lotdata/:lotid').get(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  let lotID = sanitize(req.params.lotid);
  
  ParkingLot.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(lotID) }
    },
    {
      $lookup: {
        from: "parkingspaces",
        localField: "_id",
        foreignField: "parking_lot_id",
        as: "spaces"
      }
    }
  ]).then(dbRes => {
    if (dbRes.length === 0) {
      res.send({ err: true, info: "Lot not found" });
      return;
    }

    res.send(dbRes[0]);
  }).catch(e => {
    console.log(e)
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/addlot').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  let lotName = sanitize(req.body.lotName);

  ParkingLot.findOne({ name: lotName }).then(dbRes => {
    if (dbRes != null) {
      res.send({ err: true, info: "Lot name already in use" });
      return;
    }

    let newLot = new ParkingLot({ name: lotName });
    newLot.save().then(() => {
      res.send({ err: false, info: "Success" });
    })
    .catch(e => {
      res.send({ err: true, info: "Database error" });
    });
  });
});

router.route('/deletelot').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  let lotID = sanitize(req.body.lotID);

  ParkingLot.findByIdAndDelete(lotID)
  .then(() => {
    res.send({ err: false, info: "Sucessful" });
  })
  .catch(e => {
    console.log(e);
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/spacesbookings').get(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  ParkingSpace.aggregate([
    {
      $lookup: {
        from: "bookings",
        localField: "_id",
        foreignField: "space_id",
        as: "bookings"
      }
    },
    {
      $addFields:{
        bookings_count: { $size: "$bookings" },
        bookings: "$bookings"
      }
    }
  ]).then(dbRes => {
    if (dbRes.length === 0) {
      res.send({ err: true, info: "No spaces found" });
      return;
    }

    res.send(dbRes);
  }).catch(e => {
    console.log(e)
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/addspace').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  let lotID = sanitize(req.body.lotID);
  let name = sanitize(req.body.name);
  let longitude = sanitize(req.body.longitude);
  let latitude = sanitize(req.body.latitude);

  if (name.length === 0) {
    res.send({ err: true, info: "Please enter a name/identifier" });
    return;
  }

  if (name.length > 3) {
    res.send({ err: true, info: "Max name/identifier length is 3" });
    return;
  }

  let existingSpace = await ParkingSpace.findOne({ name: name, parking_lot_id: lotID });

  if (existingSpace != null) {
    res.send({ err: true, info: "Name/indentifier already exists" });
    return;
  }

  let parkingLot = await ParkingLot.findOne({ _id: mongoose.Types.ObjectId(lotID) });

  if (parkingLot == null) {
    res.send({ err: true, info: "Parking lot not found" });
    return;
  }

  let newSpace = new ParkingSpace({
    name: name,
    parking_lot_id: mongoose.Types.ObjectId(lotID),
    longitude: longitude,
    latitude: latitude
  });

  newSpace.save().then(() => {
    res.send({ err: false, info: "Success" });
  })
  .catch(e => {
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/blockspace').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  let spaceID = sanitize(req.body.spaceID);

  ParkingSpace.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(spaceID) },
    { is_blocked: true }
  ).then(async () => {
    // Delete all bookings for that space and send email notification to users
    let bookingsAffected = await Booking.find({ space_id: mongoose.Types.ObjectId(spaceID) });

    if (bookingsAffected.length > 0) {
      let receivers = bookingsAffected.map(b => {
        return b.email;
      }).join(',');

      mailer.sendMail({
        from: `"UEA Parking Management System" <${process.env.SYSTEM_EMAIL}>`,
        to: receivers,
        subject: "Booking cancellation",
        text: 'Hello, unfortunately the space for your booking is no longer available. You will not be charged.'
      });
  
      await Booking.deleteMany({ space_id: mongoose.Types.ObjectId(spaceID) });
    };

    res.send({ err: false, info: "Success" });
  })
  .catch(e => {
    console.log(e);
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/unblockspace').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  let spaceID = sanitize(req.body.spaceID);

  ParkingSpace.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(spaceID) },
    { is_blocked: false }
  ).then(() => {
    res.send({ err: false, info: "Sucessful" });
  })
  .catch(e => {
    console.log(e);
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/assignspace').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  let requestID = sanitize(req.body.requestID);
  let spaceID = sanitize(req.body.spaceID);

  BookingRequest.findById(requestID).then(async dbRes => {
    if (Object.keys(dbRes).length === 0) {
      res.send({ err: true, info: "Booking request not found" });
      return;
    }

    let email = dbRes.email;
    let startTime = dbRes.start_timestamp;
    let endTime = dbRes.end_timestamp;
    let paid = dbRes.paid;

    // Check user who made the booking request still exists
    let user = await Account.find({ email: email });
    
    if (Object.keys(user).length === 0) {
      res.send({ err: true, info: "User not found (possibly deleted)" });
      return;
    }

    // Check the space exists and isn't "blocked"
    let space = await ParkingSpace.findById(spaceID);
    
    if (Object.keys(space).length === 0) {
      res.send({ err: true, info: "Parking space not found" });
      return;
    }

    if (space.is_blocked) {
      res.send({ err: true, info: "Space is blocked" });
      return;
    }

    // Check the space is available (duplicate of frontend for client-server security)
    let currentBookings = await Booking.find({ space_id: mongoose.Types.ObjectId(spaceID) });

    for (let b in currentBookings) {
      let bStartTime = new Date(b.start_timestamp);
      let bEndTime = new Date(b.end_timestamp);

      if ((endTime - startTime) + (bEndTime - bStartTime) > (bEndTime - startTime)) {
        res.send({ err: true, info: "Space not available" });
        return;
      }
    }

    // Insert a new booking in the database
    let newBooking = new Booking({ 
      email: email,
      space_id: mongoose.Types.ObjectId(spaceID),
      start_timestamp: startTime,
      end_timestamp: endTime,
      paid: paid
    });
    
    newBooking.save().then(saveRes => {
      mailer.sendMail({
        from: `"UEA Parking Management System" <${process.env.SYSTEM_EMAIL}>`,
        to: email,
        subject: "Booking confirmation",
        text: `Hello, thank you for booking with us! Please use this link to find your parking space, and to notify us of your arrival and departure. http://localhost:3000/booking/${saveRes._id}`
      });
    });

    // Delete the booking request
    BookingRequest.findByIdAndDelete(requestID).then(() => {
      res.send({ err: false, info: "Success" });
    });
  })
  .catch(e => {
    console.log(e);
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/rejectrequest').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  let requestID = sanitize(req.body.requestID);

  BookingRequest.findByIdAndDelete(requestID).then(() => {
    res.send({ err: false, info: "Rejected" });
  });
});

router.route('/deletespace').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  let spaceID = sanitize(req.body.spaceID);

  ParkingSpace.findByIdAndDelete(spaceID)
  .then(() => {
    res.send({ err: false, info: "Sucessful" });
  })
  .catch(e => {
    console.log(e);
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/users').get(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  Account.find().then(dbRes => {
    res.send(dbRes);
  }).catch(e => {
    console.log(e);
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/deleteuser').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  let userID = sanitize(req.body.userID);

  Account.findByIdAndDelete(userID)
  .then(() => {
    res.send({ err: false, info: "Sucessful" });
  })
  .catch(e => {
    console.log(e);
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/bookingrequests').get(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  BookingRequest.find().then(dbRes => {
    res.send(dbRes);
  }).catch(e => {
    console.log(e);
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/bookings').get(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  Booking.find({ departed: false }).then(dbRes => {
    res.send(dbRes);
  }).catch(e => {
    console.log(e);
    res.send({ err: true, info: "Database error" });
  });
});

module.exports = router;
