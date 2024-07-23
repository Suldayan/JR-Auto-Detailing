require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('Attempted connection string:', process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@'));
    process.exit(1);
});

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Models
const bookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: String,
  time: String,
  services: { type: [String], required: true },
  totalPrice: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

// Email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const ownerEmail = process.env.OWNER_EMAIL; 

const formatTime = (time24) => {
  const [hour, minute] = time24.split(':');
  const hour12 = hour % 12 || 12;
  const ampm = hour < 12 || hour === 24 ? 'AM' : 'PM';
  return `${hour12}:${minute} ${ampm}`;
};

// Routes
app.get('/api/available-slots', async (req, res) => {
  const { date } = req.query;
  const bookings = await Booking.find({ date }); 
  const bookedTimes = bookings.map(booking => booking.time);
  const allTimes = ['10:00', '12:00', '14:00', '16:00', '18:00'];
  const availableSlots = allTimes.filter(time => !bookedTimes.includes(time));
  res.json({ availableSlots });
});

app.post('/api/book', [
  body('email').isEmail(),
  body('date').notEmpty(),
  body('time').notEmpty(),
  body('services').isArray().notEmpty(),
  body('totalPrice').isNumeric(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, date, time, services, totalPrice } = req.body;

    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) {
      return res.status(400).json({ message: 'This slot is no longer available' });
    }

    const newBooking = new Booking({ email, date, time, services, totalPrice });
    await newBooking.save();

    const formattedTime = formatTime(time);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Confirmation',
      text: `Your booking for ${services.join(', ')} on ${date} at ${formattedTime} has been confirmed. Total price: $${totalPrice}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'timothysuldayan1@gmail.com',
      subject: 'New Booking Received',
      text: `A new booking has been made.\n\nDetails:\nEmail: ${email}\nDate: ${date}\nTime: ${formattedTime}\nServices: ${services.join(', ')}\nTotal Price: $${totalPrice}`
    };

    transporter.sendMail(ownerMailOptions, (error, info) => {
      if (error) {
        console.error('Error sending owner email:', error);
      } else {
        console.log('Owner email sent:', info.response);
      }
    });

    res.status(201).json({ message: 'Booking successful' });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
