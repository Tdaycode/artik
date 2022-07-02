const httpStatus = require('http-status');
const User = require('../models/user.model');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken')
const {tokenTypes} = require('../config/tokens');
const tokenService = require('../services/token.service');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken.');
  }
  const user = await User.create(userBody);
  user.password = undefined
  return user;
};
const createArtisan = async (artisanBody) => { 
  if (await User.isEmailTaken(artisanBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken.');
  }
  const user = await User.create({...artisanBody, isArtisan: true});
  user.password = undefined
  return user;

}

/**
 * Login with Phone or email
 * @param {string} login
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailORPhone = async (login, password) => {
  const user = await User.findOne({ 
      $or: [
          { email: login },
          { phone: login }
      ]
   });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect login or password');
  }
  var jwtToken = jwt.sign({ user }, process.env.JWT_SECRET, {expiresIn:'30d'});
  user.password = undefined
  return {user, jwtToken};
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  console.log(tokenTypes.REFRESH);  
  console.log(refreshTokenDoc);
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    console.log('here')
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    console.log(refreshTokenDoc);
    const user = await User.findById(refreshTokenDoc.user);

    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

const updateUser = async (userId, userBody) => { 
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const updatedUser = await User.findOneAndUpdate({ _id: userId }, userBody, { new: true });
  return updatedUser
}


module.exports = {
  createUser,
  loginUserWithEmailORPhone,
  logout,
  refreshAuth,
  updateUser,
  createArtisan
};
