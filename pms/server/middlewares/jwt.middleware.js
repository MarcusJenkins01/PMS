const jwtMiddleware = (req, res, next) => {
  console.log(req.body.token);
  next();
};

export default jwtMiddleware;