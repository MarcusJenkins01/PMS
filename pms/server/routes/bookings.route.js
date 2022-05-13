const sanitize = require('mongo-sanitize');  // To protect against SQL injection
const router = require('express').Router();
const dotenv = require('dotenv');
const jwtMiddleware = require('../middlewares/jwt.middleware');
const mongoose = require('mongoose');

let Booking = require('../models/booking.model');
let BookingRequest = require('../models/bookingRequest.model');

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
        ],
        "as": "space"
      }
    }
  ]).then(dbRes => {
    res.send(dbRes);
  });
});

router.route('/accept').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  let spaceID = sanitize(req.body.spaceID);
});

router.route('/reject').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  if (!req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

});

module.exports = router;
