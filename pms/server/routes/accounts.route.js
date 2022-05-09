const sanitize = require('mongo-sanitize');  // To protect against SQL injection
const router = require('express').Router();
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('../middlewares/jwt.middleware');

let Account = require('../models/account.model');

dotenv.config();

router.use(jwtMiddleware);

router.route('/login').post(async (req, res) => {
  let email = sanitize(req.body.email);
  let enteredPass = sanitize(req.body.pass);

  // Regex sourced from https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  if (email.length == 0 || !email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    res.send({ err: true, info: "Invalid email address" });
    return;
  }

  if (enteredPass.length == 0) {
    res.send({ err: true, info: "Please enter a password" });
    return;
  }

  let user = await Account.findOne({ email: email });

  if (user == null) {
    res.send({ err: true, info: "Couldn't find an account with that email and password combination" });
    return;
  }

  bcrypt.compare(enteredPass, user.password, (err, correct) => {
    if (correct) {
      const token = jwt.sign(
        { email: user.email, admin: user.is_admin },
        process.env.JWT_KEY,
        {
          expiresIn: "2h",
        }
      );

      res.send({ err: false, info: "Details correct", email: user.email, admin: user.is_admin, token: token });
    } else {
      res.send({ err: true, info: "Couldn't find an account with that email and password combination" });
    }
  });
});

router.route('/register').post(async (req, res) => {
  let fname = sanitize(req.body.fname);
  let lname = sanitize(req.body.lname);
  let email = sanitize(req.body.email);
  let pass = sanitize(req.body.pass);

  let user = await Account.findOne({ email: email });
  
  if (fname.length === 0) {
    res.send({ err: true, info: "Please enter a first name" });
    return;
  }

  if (lname.length === 0) {
    res.send({ err: true, info: "Please enter a last name" });
    return;
  }

  // Regex sourced from https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  if (email.length === 0 || !email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    res.send({ err: true, info: "Invalid email address" });
    return;
  }

  if (pass.length < 5 || pass.length > 32) {
    res.send({ err: true, info: "Password must be between 5 and 32 characters" });
    return;
  }

  if (user != null) {
    res.send({ err: true, info: "An account with that email address already exists" });
    return;
  }

  bcrypt.hash(pass, parseInt(process.env.SALT_ROUNDS), (err, hashedPass) => {
    if (err) {
      res.send({ err: true, info: "Something went wrong" });
      return;
    }

    let newAccount = new Account({
      first_name: fname,
      last_name: lname,
      email: email,
      password: hashedPass
    });

    newAccount.save()
    .then(() => {
      res.send({ err: false, info: "Account successfully created" });
    })
    .catch(err => {
      console.log(err);
      res.send({ err: true, info: "Database error" });
    });
  });
});

router.route('/logout').post(async (req, res) => {
  
});

module.exports = router;
