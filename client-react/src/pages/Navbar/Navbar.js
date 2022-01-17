import * as React from 'react';
import { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {

  const isLoggedIn = localStorage.getItem('isUserLoggedIn')
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="login-register-button" to="/">
              Varan
            </Link>
          </Typography>

          <Link className="login-register-button" to="/login">
            <Button color="inherit">Login</Button>
          </Link>
          <Link className="login-register-button" to="/register">
            <Button color="inherit">Register</Button>
          </Link>
          {
            isUserLoggedIn ?
              <Link className="login-register-button" to="/profile">
                <Button color="inherit">Profile</Button>
              </Link>

              : ''
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar