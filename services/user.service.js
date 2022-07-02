const httpStatus = require('http-status');
const User = require('../models/user.model');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const {tokenTypes} = require('../config/tokens');

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
  user.password = undefined
  return user;
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
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
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


module.exports = {
  createUser,
  loginUserWithEmailORPhone,
  logout,
  refreshAuth
};
