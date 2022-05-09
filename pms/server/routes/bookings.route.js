const sanitize = require('mongo-sanitize');  // To protect against SQL injection
const router = require('express').Router();
const dotenv = require('dotenv');
const jwtMiddleware = require('../middlewares/jwt.middleware');

let Booking = require('../models/booking.model');
let BookingRequest = require('../models/bookingRequest.model');

dotenv.config();

router.use(jwtMiddleware);

router.route('/make').post(async (req, res) => {
  let token = sanitize(req.body.token);


});

router.route('/accept').post(async (req, res) => {
  let token = sanitize(req.body.token);
});

router.route('/reject').post(async (req, res) => {
  let token = sanitize(req.body.token);
});

module.exports = router;
