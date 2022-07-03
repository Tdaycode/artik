const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send( user );
});

const login = catchAsync(async (req, res) => {
  const { login, password } = req.body;
  const user = await userService.loginUserWithEmailORPhone(login, password);
  res.send( user );
});

const logout = catchAsync(async (req, res) => {
  console.log(req.body.refreshToken)
  await userService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await userService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const updateUsers = catchAsync(async (req, res) => { 
  const user = await userService.updateUser(req.user._id,req.body);
  res.status(httpStatus.OK).send(user);
})

const createArtisan = catchAsync(async (req, res) => { 
  const user = await userService.createArtisan(req.body);
  res.status(httpStatus.CREATED).send(user);
  res.status(httpStatus.OK).send(user);
})

const editUser = catchAsync(async (req, res) => { 
  const user = await userService.editUser(req.user._id,req.body);
  res.status(httpStatus.OK).send(user);
})

const getSingleUsers = catchAsync(async (req, res) => { 
  const user = await userService.getSingleUser(req.user);
  res.status(httpStatus.OK).send(user);
})

const postJobs = catchAsync(async (req, res) => { 
  const job = await userService.postJob(req.user._id,req.body);
  res.status(httpStatus.CREATED).send(job);
})
module.exports = {
  register,
  login,
  logout,
  editUser,
  postJobs,
  updateUsers,
  refreshTokens,
  createArtisan,
  getSingleUsers
};
