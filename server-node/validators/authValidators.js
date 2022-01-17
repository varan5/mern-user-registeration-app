const registerValuesNotEmpty = (req) => {
  const { firstName, lastName, email, phone, address, password } = req.body
  return firstName != '' && lastName != '' && email != '' && phone != '' && address != '' && password != ''
}

const registerValidator = (req, res, next) => {
  if (registerValuesNotEmpty(req)) {
    console.log('Validated: all good')
    next()
  } else {
    console.log('Validated: errors found')
    res.status(400).json({
      success: false,
      message: 'No field can be kept empty'
    })
  }
}

const loginValuesNotEmpty = (req) => {
  const { email, password } = req.body
  return email != '' && password != ''
}

const loginValidators = (req, res, next) => {
  if (loginValuesNotEmpty(req)) {
    console.log('Validated: all good')
    next()
  } else {
    console.log('Validated: errors found')
    res.status(400).json({
      success: false,
      message: 'No field can be kept empty'
    })
  }
}


module.exports = {
  registerValidator,
  loginValidators
}