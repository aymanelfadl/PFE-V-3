import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useNotificationContext } from './NotificationContext';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { set } from 'mongoose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function BoxList({ onLogOut }) {
  const { notificationCount, increaseNotificationCount } = useNotificationContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [ProductData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/productlist');
        const data = await response.json();
       setProductData(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (e) => {
    e.stopPropagation();
    setOpenDialog(false);
  };

  return (
    <>
      <Box sx={{ width: '200px', bgcolor: '#cfcfcf', zIndex: '100', borderRadius: '20px', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation() }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding >
              <ListItemButton onClick={handleOpenDialog}>
                <ListItemIcon>
                  <CircleNotificationsIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary={"Inbox"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={onLogOut}>
              <ListItemButton>
                <ListItemIcon>
                  <MeetingRoomIcon style={{ color: 'white' }} />
                </ListItemIcon >
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding >
              <ListItemButton>
                <ListItemIcon>
                  <SupportAgentIcon style={{ color: 'white' }} />
                </ListItemIcon >
                <ListItemText primary="Support " />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} >
        <DialogTitle ><u>Notification</u></DialogTitle>
        <DialogContent>
        <DialogContentText>
        {ProductData.map((product) => {
            if (product.quantityInStock === 0) {
              return (
                <div key={product.id}>
                  <p>
                    <FontAwesomeIcon icon={faXmark} className='mx-2' color='red'/>
                    Product <span style={{ color: 'red', fontWeight:"bolder"}}>{product.name}</span> is Out Of Stock.
                  </p>
                </div>
              );
            } else if (product.quantityInStock < 50) {
              return (
                <div key={product.id}>
                  <p>
                   <FontAwesomeIcon icon={faWarning} className='mx-2' color='orange' />
                    Product <span style={{ color: 'orange',  fontWeight:"bolder"}}>{product.name}</span> is Close To End Up.
                  </p>
                </div>
              );
            }
            return null;
          })}
          {ProductData.length === 0 && <p>No specific notification for this product.</p>}
      </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
