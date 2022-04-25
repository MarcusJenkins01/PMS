const jwtMiddleware = (req, res, next) => {
  console.log(req.body.token);
  next();
};

module.exports = jwtMiddleware;
