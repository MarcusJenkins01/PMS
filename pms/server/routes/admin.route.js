const sanitize = require('mongo-sanitize');
const router = require('express').Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const ParkingSpace = require('../models/parkingSpace.model');
const ParkingLot = require('../models/parkingLot.model');
const Account = require('../models/account.model');
const mongoose = require('mongoose');

dotenv.config();

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
  ParkingLot.aggregate([
    {
      "$lookup": {
        "from": "parkingspaces",
        "localField": "_id",
        "foreignField": "parking_lot_id",
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

router.route('/addspace').post(async (req, res) => {
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
  let spaceID = sanitize(req.body.spaceID);

  ParkingSpace.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(spaceID) },
    { is_blocked: true }
  ).then(() => {
    res.send({ err: false, info: "Sucessful" });
  })
  .catch(e => {
    console.log(e);
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/unblockspace').post(async (req, res) => {
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

router.route('/deletespace').post(async (req, res) => {
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
  Account.find()
  .then(dbRes => {
    res.send(dbRes);
  }).catch(e => {
    console.log(e);
    res.send({ err: true, info: "Database error" });
  });
});

router.route('/deleteuser').post(async (req, res) => {
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

module.exports = router;
