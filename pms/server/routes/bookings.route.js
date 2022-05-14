const sanitize = require('mongo-sanitize');  // To protect against SQL injection
const router = require('express').Router();
const dotenv = require('dotenv');
const jwtMiddleware = require('../middlewares/jwt.middleware');
const mongoose = require('mongoose');
const haversine = require('haversine');
const mailer = require('../middlewares/nodemailer.middleware');

let Booking = require('../models/booking.model');
let BookingRequest = require('../models/bookingRequest.model');
let Account = require('../models/account.model');
let ParkingSpace = require('../models/parkingSpace.model');

dotenv.config();

router.use(jwtMiddleware);

router.route('/make').post(async (req, res) => {
  let location = sanitize(req.body.location);
  let startTimestamp = sanitize(req.body.starttime);
  let endTimestamp = sanitize(req.body.endtime);

  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.email) {
    res.send({ err: true, info: "Invalid credentials" });
    return;
  }

  if (location.length === 0) {
    res.send({ err: true, info: "Please enter a destination" });
    return;
  }

  if (location.length > 100) {
    res.send({ err: true, info: "Destination is too long (max 100)" });
    return;
  }

  let newRequest = new BookingRequest({
    email: req.body.tokenPayload.email,
    location: location,
    start_timestamp: startTimestamp,
    end_timestamp: endTimestamp
  });

  newRequest.save().then(() => {
    res.send({ err: false, info: "Booking request made" });
  })
  .catch(err => {
    console.log(err);
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/get/:bookingid').get(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  let bookingID = sanitize(req.params.bookingid);

  Booking.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(bookingID) }
    },
    {
      $lookup: {
        "from": "parkingspaces",
        "let": { "spaceID": { $toObjectId: "$space_id" } },
        pipeline: [
          { $match: { $expr: { $eq: [ "$_id", "$$spaceID" ] } } },
          { 
            $lookup: {
              from: "parkinglots",
              localField: "parking_lot_id",
              foreignField: "_id",
              as: "parkingLot"
            }
          }
        ],
        "as": "space"
      }
    }
  ]).then(dbRes => {
    res.send(dbRes[0]);
  });
});

router.route('/arrived').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  let bookingID = sanitize(req.body.bookingID);
  let userLocation = sanitize(req.body.userLocation);

  let booking = await Booking.findById(bookingID);
  let space = await ParkingSpace.findById(booking.space_id);

  let bookingStartTime = new Date(booking.start_timestamp);
  let bookingEndTime = new Date(booking.end_timestamp);

  if (booking.email !== req.body.tokenPayload.email) {
    res.send({ err: true, info: "You are not authorised to do this" });
    return;
  }

  booking.arrived = true;
  booking.arrival_time = Date.now();

  booking.save().then(async () => {
    let admins = await Account.find({ admin: true });
    
    let receivers = admins.map(admin => {
      return admin.email;
    });

    let receiversCSV = receivers.join(',');

    let subject = "Booking arrival";
    let text = `${booking.email} has arrived for their booking between ${bookingStartTime.toLocaleString()} and ${bookingEndTime.toLocaleString()} at coordinates: ${userLocation.latitude}, ${userLocation.longitude}`;

    // Check they've arrived in the correct space
    let distanceToSpace = haversine(space, userLocation, { unit: 'meter' }).toFixed(2);

    if (distanceToSpace > parseInt(process.env.MAX_SPACE_DISTANCE)) {
      subject = "Space mismatch";
      text = `${booking.email} has arrived for their booking between ${bookingStartTime.toLocaleString()} and ${bookingEndTime.toLocaleString()} at a distance of ${distanceToSpace}m from their parking space at: ${userLocation.latitude}, ${userLocation.longitude}`;
    }

    // Notify admin of arrival or if the space doesn't match
    mailer.sendMail({
      from: `"UEA Parking Management System" <${process.env.SYSTEM_EMAIL}>`,
      to: receiversCSV,
      subject,
      text
    });

    res.send({ err: false, info: "Arrived" })
  });
});

router.route('/departed').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  let bookingID = sanitize(req.body.bookingID);

  let booking = await Booking.findById(bookingID);
  let bookingStartTime = new Date(booking.start_timestamp);
  let bookingEndTime = new Date(booking.end_timestamp);

  if (booking.email !== req.body.tokenPayload.email) {
    res.send({ err: true, info: "You are not authorised to do this" });
    return;
  }

  booking.departed = true;
  booking.departure_time = Date.now();

  booking.save().then(async () => {
    let admins = await Account.find({ admin: true });
    
    let receivers = admins.map(admin => {
      return admin.email;
    });

    let receiversCSV = receivers.join(',');

    mailer.sendMail({
      from: `"UEA Parking Management System" <${process.env.SYSTEM_EMAIL}>`,
      to: receiversCSV,
      subject: "Booking departure",
      text: `${booking.email} has departed from their booking between ${bookingStartTime.toLocaleString()} and ${bookingEndTime.toLocaleString()}`
    });

    res.send({ err: false, info: "Departed" });
  });
});

module.exports = router;
