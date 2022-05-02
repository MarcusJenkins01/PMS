const router = require('express').Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const socket = require('socket.io');

var io;

dotenv.config();

router.route('/send').post(async (req, res) => {
  
});

module.exports = (server) => {
  io = socket(server);
  return router;
};
