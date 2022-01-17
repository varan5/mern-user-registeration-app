import * as React from 'react';
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import { simplePostCall } from '../../api/ApiServices'
import ApiConfig from '../../api/ApiConfig';

const theme = createTheme();

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emptyFieldError, setEmptyFieldError] = useState(false)
  const [success, setSuccess] = useState('')
  const [failure, setFailure] = useState('')

  const checkIsAnyFieldEmpty = () => {
    if (email == '' || password == '') {
      return true;
    }
    return false
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const isAnyFieldEmpty = checkIsAnyFieldEmpty()
    if (isAnyFieldEmpty) {
      setEmptyFieldError(true)
      return
    }

    const registerUserUrl = ApiConfig.LOGIN_USER
    const registerUserData = {
      email,
      password
    }
    console.log('Data: ', registerUserData)
    const loginedUser = await simplePostCall(registerUserUrl, registerUserData)
    if (loginedUser) {
      setSuccess('User logged in sucessfully')
      console.log('User: ', loginedUser.data.user._id)
      const userId = loginedUser.data.user._id
      const loginToken = loginedUser.data.token
      localStorage.setItem('token', loginToken)
      localStorage.setItem('_id', userId)
      localStorage.setItem('isLoggedIn', true)
      console.log('Local storage id: ', localStorage.getItem('_id'))
    } else {
      setFailure('Unalbe to login user')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              onClick={handleLoginSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/register">
                  Do not have an account? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login