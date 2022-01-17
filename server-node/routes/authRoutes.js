const express = require('express')
const router = express()
const { loginUser, registerUser } = require('../controllers/authControllers')
const { registerValidator, loginValidators } = require('../validators/authValidators')

router.post('/login', loginValidators, loginUser)
router.post('/register', registerValidator, registerUser)

module.exports = router