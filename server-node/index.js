const express = require('express')
const app = express()
const connectDatabase = require('./config/database')
const cors = require('cors')
const authRoute = require('./routes/authRoutes')
const profileRoute = require('./routes/profileRoutes')
const dotenv = require('dotenv').config()

connectDatabase()

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoute)
app.use('/api/profile', profileRoute)
app.get('/', (req, res) => res.send('Welcome to Varans Assignment App'))

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))