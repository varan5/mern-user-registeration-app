const express = require('express')
const { getUserProfile } = require('../controllers/profileControllers')
const router = express()

router.post('/user', getUserProfile)

module.exports = router