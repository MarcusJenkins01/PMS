const router = require('express').Router();
const jwtMiddleware = require('../middlewares/jwt.middleware');
const mailer = require('../middlewares/nodemailer.middleware');
const sanitize = require('mongo-sanitize');
const mongoose = require('mongoose');

let Ticket = require('../models/ticket.model');
let Account = require('../models/account.model');
let TicketChat = require('../models/ticketChat.model');

router.use(jwtMiddleware);

router.route('/submit').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  let email = sanitize(req.body.tokenPayload.email);
  let name = sanitize(req.body.name);
  let message = sanitize(req.body.message);
  let status = sanitize(req.body.status);

  if (email === ""  || message === "" || name === ""){
    res.send({ err: true, info: "All fields must contain valid text!" });
    return;
  }

  let newTicket = new Ticket({
    name: name,
    email: email,
    message: message,
    status: status
  });

  newTicket.save().then(async saveRes => {
    let admins = await Account.find({ admin: true });
    
    let receivers = admins.map(admin => {
      return admin.email;
    });

    let receiversCSV = receivers.join(',');

    mailer.sendMail({
      from: `"UEA Parking Management System" <${process.env.SYSTEM_EMAIL}>`,
      to: receiversCSV,
      subject: "Support ticket",
      text: `${email} has logged a support ticket, click here http://localhost:3000/ticket/${saveRes._id} to view it.`
    });

    res.send({ err: false, info: "Ticket submitted" });
  });
});

router.route('/message').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  let ticketID = sanitize(req.body.ticketID);
  let message = sanitize(req.body.message);

  if (message.length === 0) {
    res.send({ err: true, info: "Please enter a message!" });
    return;
  }

  let ticket = await Ticket.findById(ticketID);

  if (!ticket.email) {
    res.send({ err: true, info: "Ticket not found" });
    return;
  }

  if (ticket.status !== 'Open') {
    res.send({ err: true, info: "Ticket is closed" });
    return;
  }

  if ((ticket.email !== req.body.tokenPayload.email) && !req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  let newChat = new TicketChat({
    ticket_id: mongoose.Types.ObjectId(ticketID),
    message: message,
    admin: req.body.tokenPayload.admin
  });

  newChat.save().then(async () => {
    if (!req.body.tokenPayload.admin) {
      let admins = await Account.find({ admin: true });
      
      let receivers = admins.map(admin => {
        return admin.email;
      });
  
      let receiversCSV = receivers.join(',');
  
      mailer.sendMail({
        from: `"UEA Parking Management System" <${process.env.SYSTEM_EMAIL}>`,
        to: receiversCSV,
        subject: "Ticket message",
        text: `${req.body.tokenPayload.email} has added a message to their support ticket, click here http://localhost:3000/ticket/${ticketID} to view it.`
      });
    }

    res.send({ err: false, info: "Message submitted" });
  });
});

router.route('/list').get(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  let tickets = req.body.tokenPayload.admin ?
    await Ticket.find() :
    await Ticket.find({ email: req.body.tokenPayload.email });

  res.send(tickets);
});

router.route('/deleteticket').post(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({err: true, info: "Invalid token"});
    return;
  }

  let ticketID = sanitize(req.body.ticketID);

  let ticket = await Ticket.findById(ticketID);

  // Check the user deleting the ticket is either an admin or the user that created it
  if ((ticket.email !== req.body.tokenPayload.email) && !req.body.tokenPayload.admin) {
    res.send({ err: true, info: "Insufficient permissions" });
    return;
  }

  Ticket.findByIdAndDelete(req.body.ticketID).then(async () => {
    if (!req.body.tokenPayload.admin) {
      let admins = await Account.find({ admin: true });
    
      let receivers = admins.map(admin => {
        return admin.email;
      });

      let receiversCSV = receivers.join(',');

      mailer.sendMail({
        from: `"UEA Parking Management System" <${process.env.SYSTEM_EMAIL}>`,
        to: receiversCSV,
        subject: "Ticket closed",
        text: `${email} has closed their support ticket.`
      });
    }

    res.send({err: false, info: "Successful" });
  })
  .catch(e => {
    console.log(e);
    res.send({err: true, info: "Database error" })
  })
});

router.route('/get/:ticketid').get(async (req, res) => {
  if (!req.body.tokenValid) {
    res.send({ err: true, info: "Invalid token" });
    return;
  }

  let ticketID = sanitize(req.params.ticketid);

  Ticket.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(ticketID) }
    },
    {
      $lookup: {
        from: "ticketchats",
        localField: "_id",
        foreignField: "ticket_id",
        as: "ticketChats"
      }
    }
  ]).then(dbRes => {
    let ticket = dbRes[0];

    // Check the user is an admin or it's the user who made the ticket trying to view it
    if ((ticket.email !== req.body.tokenPayload.email) && !req.body.tokenPayload.admin) {
      res.send({ err: true, info: "Insufficient permissions" });
      return;
    }

    res.send(ticket);
  }).catch(e => {
    console.log(e);
    res.send({err: true, info: "Database error" })
  });
});

module.exports = router;
