const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtMiddleware = (req, res, next) => {
  let token = req.headers.authorisation;
  
  if (token != 'null') {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      req.body.tokenPayload = decoded;
      req.body.tokenValid = decoded != null && decoded.id != null;
    });
  } else {
    req.body.tokenPayload = {};
    req.body.tokenValid = false;
  }

  next();
};

module.exports = jwtMiddleware;
