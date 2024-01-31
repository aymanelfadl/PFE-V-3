import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import BoxList from './BoxList';

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: '#d3d3d3',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function ImageAvatars() {
  const userName = localStorage.getItem('userName');
  const [displayBoxList, setDisplayBoxList] = useState(false);

  const LogOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block',cursor:'pointer' }}>
        <Avatar {...stringAvatar(userName)} onClick={onAvatareClick => setDisplayBoxList(!displayBoxList)} />
        {displayBoxList && 
          <div style={{ position: 'absolute', top: '-265%', left: '50%', zIndex: '1000'}}>
            <BoxList onLogOut={LogOut}/>
          </div>
        }
    </div>
  );
}
