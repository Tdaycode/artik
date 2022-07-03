const express = require('express');
const User = require('../models/user.model');
const Job = require('../models/job.model');
const Booking = require('../models/booking.model');
const asyncHandler = require('express-async-handler');
const {protect, artisan}= require('../middleware/auth');

const router = express.Router();

router.get('/artisan/get-bookings', protect, artisan, asyncHandler(async (req, res) => {
  const bookings = await Booking.find({artisan:req.user._id}).populate('client', '-password');
  if(!bookings) {return res.status(404).send('No bookings found');}
  res.send(bookings);
}))




module.exports = router;