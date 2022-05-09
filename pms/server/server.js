const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const accountsRouter = require('./routes/accounts.route');
const bookingsRouter = require('./routes/bookings.route');
const adminRouter = require('./routes/admin.route');
const chatRouter = require('./routes/chat.route');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Allow cross-origin requests from port 3000, and add our Authorisation header to the allowed header list
const corsOptions ={
  origin: 'http://localhost:3000', 
  credentials: true,
  methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorisation'],
  exposedHeaders: ['Content-Type']
}
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/accounts', accountsRouter);
app.use('/bookings', bookingsRouter);
app.use('/admin', adminRouter);
app.use('/chat', chatRouter);

mongoose.connect(process.env.PMS_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to database');
})
.catch(err => {
  console.log(err);
  console.log('Database failed to connect');
});

const conn = mongoose.connection;

app.listen(port, () => {
  console.log(`Express running on port ${port}`);
});
