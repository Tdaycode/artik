const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const jobService = require('../services/job.service');


const getSingleJob = catchAsync(async (req, res) => { 
  const job = await jobService.getSingleJob(req.params.id);
  res.status(httpStatus.OK).send(job);
})

module.exports = { 
  getSingleJob
}
