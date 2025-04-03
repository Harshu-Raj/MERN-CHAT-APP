import React, { useState } from 'react';
import Header from './Header';
import { 
  Box, Tabs, Tab, List, ListItem, ListItemText, 
  ListItemAvatar, Avatar, Typography, Divider 
} from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';

export default function Sidebar({ user, onlineUser, setRoomData, roomData }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChatroom = (selectedUser) => {
    setRoomData({
      ...roomData,
      room: "test", 
      receiver: selectedUser
    });
  };

  return (
    <Box sx={{ width: "25vw", display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header user={user} />
      
      {/* Tabs */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Sidebar Tabs"
        variant="fullWidth"
      >
        <Tab icon={<ChatBubbleIcon fontSize='small' />} label="Chats" iconPosition="start" sx={{ minHeight: "inherit" }}/>
        <Tab icon={<PersonIcon fontSize='medium' />} label="User" iconPosition="start" sx={{ minHeight: 'inherit' }}/>
      </Tabs>

      {/* Chats Tab */}
      {value === 0 && (
        <List sx={{ p: 0, overflowY: "auto", flex: "1 0 0" }}>
          {onlineUser.filter(ele => ele._id !== user._id).map((selectedUser) => (
            <React.Fragment key={selectedUser._id}>
              <ListItem alignItems="flex-start" onClick={() => handleChatroom(selectedUser)} button>
                <ListItemAvatar>
                  <Avatar alt={selectedUser.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={selectedUser.name}
                  secondary={
                    <Typography variant="caption">{selectedUser.email}</Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}

      {/* User Tab */}
      {value === 1 && (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {onlineUser.map((selectedUser) => (
            <React.Fragment key={selectedUser._id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={selectedUser.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={selectedUser.name}
                  secondary={
                    <Typography variant="caption">{selectedUser.email}</Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
}
