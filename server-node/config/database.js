const mongoose = require('mongoose')

const connectDatabase = () => {
  mongoose.connect(process.env.DATABASE_URL, (error, response) => {
    if (response) {
      console.log('Connected to the database')
    } else {
      console.log('Error occurred while connecting the database')
    }
  })
}

module.exports = connectDatabase