const express = require('express');
const User = require('../models/user.model');
const httpStatus = require('http-status');
const asyncHandler = require('express-async-handler');
const Job = require('../models/job.model');
const {protect, artisan}= require('../middleware/auth');


const router = express.Router();


router.get('/getSingleJob/:id', protect, artisan, asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(httpStatus.OK).send(job);
}));



module.exports = router;