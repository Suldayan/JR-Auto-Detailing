const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

// Log environment variables
console.log('Environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Is set' : 'Is not set');
console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE);
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Is set' : 'Is not set');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Is set' : 'Is not set');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

const connectWithRetry = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

const bookingSchema = new mongoose.Schema({
  email: String,
  date: String,
  time: String,
  services: [String],
  totalPrice: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Define business hours and slot duration
const BUSINESS_HOURS = {
  start: 12, // 12 PM
  end: 20,   // 8 PM
};
const SLOT_DURATION = 120; // 2 hours in minutes

// Helper function to generate time slots from 12 PM to 8 PM with 2-hour intervals
const generateTimeSlots = () => {
  const slots = [];
  const startTime = moment().set({ hour: BUSINESS_HOURS.start, minute: 0, second: 0 });
  const endTime = moment().set({ hour: BUSINESS_HOURS.end, minute: 0, second: 0 });

  while (startTime < endTime) {
    slots.push(startTime.format('HH:mm'));
    startTime.add(SLOT_DURATION, 'minutes');
  }

  return slots;
};

app.get('/available-slots', async (req, res) => {
  const { date } = req.query;
  
  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }

  try {
    // Generate all possible time slots
    const allSlots = generateTimeSlots();

    // Fetch existing bookings for the given date
    const queryDate = moment(date).format('YYYY-MM-DD');
    
    const existingBookings = await Booking.find({
      date: queryDate
    });

    console.log('Existing bookings:', existingBookings);

    // Create a set of booked times
    const bookedTimes = new Set(existingBookings.map(booking => booking.time));

    console.log('Booked times:', Array.from(bookedTimes));

    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => !bookedTimes.has(slot));

    console.log('Available slots:', availableSlots);

    res.json({ availableSlots });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ message: 'Error fetching available slots' });
  }
});

app.post('/book', async (req, res) => {
  try {
    const { email, date, time, services, totalPrice } = req.body;

    const queryDate = moment(date).format('YYYY-MM-DD');

    // Check if the slot is still available
    const existingBooking = await Booking.findOne({
      date: queryDate,
      time: time
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'This slot is no longer available' });
    }

    // Create new booking
    const newBooking = new Booking({
      email,
      date: queryDate,
      time,
      services,
      totalPrice,
    });

    // Save booking to database
    const savedBooking = await newBooking.save();
    console.log('Saved booking:', savedBooking);

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Confirmation',
      text: `Your booking for ${queryDate} at ${time} has been confirmed. Total price: $${totalPrice}`,
      html: `<h1>Booking Confirmation</h1>
             <p>Your booking for ${queryDate} at ${time} has been confirmed.</p>
             <p>Services: ${services.join(', ')}</p>
             <p>Total price: $${totalPrice}</p>`,
    });

    res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});