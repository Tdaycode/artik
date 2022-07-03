const express = require('express');
const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const {protect, artisan}= require('../middleware/auth');


const router = express.Router();

router.get('/find/skill',  asyncHandler(async (req, res) => {
  const {skill} = req.body;
  const users = await User.find({skill:skill, isArtisan:true}).select('-password');
  if(!users) return res.status(404).send('No users with such skill found');
  res.send(users);
}))

router.get('/all-artisan', asyncHandler(async (req, res) => {
  const users = await User.find({isArtisan:true}).select('-password');
  if(!users) return res.status(404).send('No users  found');
  res.send(users);
}))

module.exports = router

