const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createToken = (user) => {
  const userId = user._id.toString()
  token = jwt.sign({ user }, userId)
  return token
}

const registerUser = async (req, res) => {
  const { firstName, lastName, email, phone, address, password } = req.body
  console.log('User data: ', req.body)
  try {
    const userAlreadyPresent = await User.findOne({ email })
    if (userAlreadyPresent) {
      return res.status(400).json({
        success: false,
        message: 'User already present',
      })
    }
    // Register user
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const newUser = await User.create({ firstName, lastName, email, phone, address, password: hashedPassword })
      if (newUser) {
        res.status(201).json({
          success: true,
          message: 'User created successfully',
        })
      }

    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'User not created',
        error: error.message
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error occurred while registering the user',
      error: error.message
    })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      const savedDatabasaPassword = user.password
      const isPasswordMatched = await bcrypt.compare(password, savedDatabasaPassword)
      if (isPasswordMatched) {
        token = createToken(user)
        return res.status(200).json({
          success: true,
          message: 'User login successfull',
          token,
          user
        })
      } else {
        return res.status(401).json({
          success: false,
          message: 'Email or password is incorrect'
        })
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'No user found'
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error occurred while user login',
      error: error.message
    })
  }
}

module.exports = {
  registerUser,
  loginUser
}