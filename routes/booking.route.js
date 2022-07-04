const express = require('express');
const User = require('../models/user.model');
const Job = require('../models/job.model');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status');
const Booking = require('../models/booking.model');
const asyncHandler = require('express-async-handler');
const {protect, artisan}= require('../middleware/auth');

const router = express.Router();

router.get('/artisan/get-bookings', protect, artisan, asyncHandler(async (req, res) => {
  const bookings = await Booking.find({artisan:req.user._id}).populate('client', '-password');
  if(!bookings) {return res.status(404).send('No bookings found');}
  res.send(bookings);
}))

router.get('/user/get-bookings', protect, asyncHandler(async (req, res) => {
  const bookings = await Booking.find({client:req.user._id}).populate('artisan', '-password');
  if(!bookings) {return res.status(404).send('No bookings found');}
  res.send(bookings);

}))

// router.put('/artisan/booking/accept-or-deny', protect, artisan, asyncHandler(async (req, res) => {
//   const {bookingId, status} = req.body;
//   const booking = await Booking.findById(bookingId);
//   if(!booking) {return res.status(404).send('No booking found');}
//   if(status === 'accepted'){ 
//     booking.isAccepted = true;
//     await booking.save();

//   } else if (status === 'rejected') {
//     booking.isAccepted = false;
//     await booking.save();
//   }else {
//     return res.status(400).send('Invalid status, should be rejected or accepted');
//   }
// //  tayo
//   res.send(booking);
// }))




module.exports = router;