import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

export default function BoxList({onLogOut}) {
  return (
    <Box sx={{ width: '200px', bgcolor: '#cfcfcf', zIndex:'100', borderRadius:'20px',cursor:'pointer' }}>
      <nav aria-label="main mailbox folders">  
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CircleNotificationsIcon style={{color:'white'}}/>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={onLogOut} >
            <ListItemButton>
              <ListItemIcon>
                <MeetingRoomIcon style={{color:'white'}}/>
              </ListItemIcon >
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
    </Box>
  );
}
