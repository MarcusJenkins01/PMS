const sanitize = require('mongo-sanitize');  // To protect against SQL injection
const router = require('express').Router();
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let Booking = require('../models/booking.model');
let BookingRequest = require('../models/bookingRequest.model');

dotenv.config();

router.route('/request').post(async (req, res) => {
  let token = sanitize(req.body.token);

  
});

router.route('/respond').post(async (req, res) => {
  let token = sanitize(req.body.token);
});

module.exports = router;
