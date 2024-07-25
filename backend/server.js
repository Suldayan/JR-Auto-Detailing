const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const moment = require('moment');
const NodeCache = require('node-cache');
const morgan = require('morgan');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.startTime = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - req.startTime;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });
  next();
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const bookingSchema = new mongoose.Schema({
  email: String,
  date: String,
  time: String,
  services: [String],
  totalPrice: Number,
});

bookingSchema.index({ date: 1, time: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const BUSINESS_HOURS = {
  start: parseInt(process.env.BUSINESS_HOURS_START) || 12,
  end: parseInt(process.env.BUSINESS_HOURS_END) || 20,
};
const SLOT_DURATION = parseInt(process.env.SLOT_DURATION) || 120;

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

  const cacheKey = `availableSlots_${date}`;
  const cachedSlots = cache.get(cacheKey);

  if (cachedSlots) {
    return res.json({ availableSlots: cachedSlots });
  }

  try {
    const allSlots = generateTimeSlots();
    const queryDate = moment(date).format('YYYY-MM-DD');
    
    const existingBookings = await Booking.find({
      date: queryDate
    }).lean();

    console.log('Existing bookings:', existingBookings);

    const bookedTimes = new Set(existingBookings.map(booking => booking.time));

    console.log('Booked times:', Array.from(bookedTimes));

    const availableSlots = allSlots.filter(slot => !bookedTimes.has(slot));

    console.log('Available slots:', availableSlots);

    cache.set(cacheKey, availableSlots);
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

    const existingBooking = await Booking.findOne({
      date: queryDate,
      time: time
    }).lean();

    if (existingBooking) {
      return res.status(400).json({ message: 'This slot is no longer available' });
    }

    const newBooking = new Booking({
      email,
      date: queryDate,
      time,
      services,
      totalPrice,
    });

    const savedBooking = await newBooking.save();
    console.log('Saved booking:', savedBooking);

    res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });

    // Clear the cache for this date
    cache.del(`availableSlots_${queryDate}`);

    // Send email after sending the response
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Confirmation',
      text: `Your booking for ${queryDate} at ${time} has been confirmed. Total price: $${totalPrice}`,
      html: `<h1>Booking Confirmation</h1>
             <p>Your booking for ${queryDate} at ${time} has been confirmed.</p>
             <p>Services: ${services.join(', ')}</p>
             <p>Total price: $${totalPrice}</p>`,
    }).catch(error => console.error('Error sending email:', error));

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});