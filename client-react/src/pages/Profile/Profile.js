import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DraftsIcon from '@mui/icons-material/Drafts';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { simplePostCall } from '../../api/ApiServices'
import ApiConfig from '../../api/ApiConfig';

const Profile = () => {

  const [profileData, setProfileData] = useState({})

  const getUserProfile = async () => {
    const _id = localStorage.getItem('_id')
    const token = localStorage.getItem('token')
    const getUserProfileUrl = ApiConfig.GET_USER_PROFILE
    const tokenData = {
      _id,
      token
    }

    try {
      console.log('profile url: ', getUserProfileUrl)
      console.log('token', tokenData)
      const userProfile = await simplePostCall(getUserProfileUrl, tokenData)
      if (userProfile) {
        setProfileData(userProfile.data.userDetails)
      }
    } catch (error) {
      console.log('Error occurred while getting profile: ', error)
    }
  }

  useEffect(getUserProfile, [])

  return (
    <div>
      <h3>Profile</h3>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {profileData.firstName}  {profileData.lastName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {profileData.email}
          </Typography>

          <Box sx={{ width: '100%', maxWidth: 345, bgcolor: 'background.paper' }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary={profileData.address} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LinkedInIcon />
                  </ListItemIcon>
                  <ListItemText primary={profileData.phone} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>

        </CardContent>
      </Card>
    </div >
  );
}

export default Profile