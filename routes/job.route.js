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

router.delete('/deleteJob/:id', protect, asyncHandler(async (req, res) => {
  const job = await Job.findOneAndDelete({_id:req.params.id, postedBy:req.user._id});
  if(!job) {return res.status(404).send('No job with such id found');}
  res.status(httpStatus.OK).send("job deleted");

}));

router.get('/all-job', protect, asyncHandler(async (req, res) => {
  const jobs = await Job.find({postedBy:req.user._id});
  if(!jobs) {return res.status(404).send('No jobs found');}
  res.send(jobs);
}))

router.get('/all-jobs', asyncHandler(async (req, res) => {
  const jobs = await Job.find();
  if(!jobs) {return res.status(404).send('No jobs found');}
  res.send(jobs);
}))





module.exports = router;