const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const verifyUserToken = (userId, token) => {
  jwt.verify(token, userId, function (err, decoded) {
    if (err) {
      console.log('Error: ', err)
      return false
    }
    if (decoded) {
      console.log('Great: ', decoded)
      return true
    }
  });
}

const getUserProfile = async (req, res) => {
  const { _id, token } = req.body
  const requestedProfileFields = {
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    address: true,
  }
  const isTokenVerified = verifyUserToken(_id, token)
  if (!isTokenVerified) {
    return res.status(400).json({
      success: false,
      message: 'Invalid token',
    })
  }
  try {
    const userDetails = await UserModel.findOne({ _id: _id }, requestedProfileFields)
    if (userDetails) {
      res.status(200).json({
        success: true,
        message: 'User details found',
        userDetails: userDetails
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unalbe to get the user details at the moment',
      error: error.message
    })
  }

}

module.exports = {
  getUserProfile
}