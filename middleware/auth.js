const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
require('dotenv').config();

const protect = asyncHandler(async (req, res, next) => {

  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findOne({_id: decoded.user._id}).select("-password")

      if(req.user == null) throw new Error('Not authorized, user not found')

      next()

    } catch (error) {
      console.log(error)
      return res.status(401).json({
        "status": "error",
        "message": error.message
      })
    }
  }

  if (!token) {
    return res.status(401).json({
      "status": "error",
      "message": "Not authorized, no token"
    })
  }
})




const artisan = (req, res, next) => {

  if (req.user && req.user.isArtisan) {
    next()
  } else {
    return res.status(401).json({
      "status": "error",
      "message": "Only artisans are authorized"
    })
  }
}




module.exports = {protect, artisan}