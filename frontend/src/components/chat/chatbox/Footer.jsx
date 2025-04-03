import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const Footer = ({ handleSendmsg, selectedUser }) => {
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedUser) {
      console.error("Error: No user selected for chat!");
      return;
    }

    if (!msg.trim()) {
      console.error("Error: Cannot send an empty message!");
      return;
    }

    const messageData = {
      text: msg,
      receiverId: selectedUser._id, // Ensure receiverId is passed correctly
    };

    console.log("Sending message:", messageData);
    handleSendmsg(messageData);
    setMsg("");
  };

  return (
    <Box sx={{ p: 1, display: 'flex' }}>
      <Box sx={{ display: 'flex', flex: 1 }} component="form" onSubmit={handleSubmit}>
        <TextField
          placeholder="Type your message..."
          size="small"
          fullWidth
          value={msg}
          onChange={handleChange}
        />
        <Button type="submit" variant="outlined">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;
