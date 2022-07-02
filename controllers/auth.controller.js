const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const tokenService = require('../services/token.service');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { login, password } = req.body;
  const user = await userService.loginUserWithEmailORPhone(login, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
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
  const user = await userService.updateUser(req.params.userId,req.body);
  res.status(httpStatus.OK).send(user);
})

const createArtisan = catchAsync(async (req, res) => { 
  const user = await userService.createArtisan(req.body);
  res.status(httpStatus.CREATED).send(user);
  res.status(httpStatus.OK).send(user);
})


module.exports = {
  register,
  login,
  logout,
  updateUsers,
  refreshTokens,
  createArtisan
};
