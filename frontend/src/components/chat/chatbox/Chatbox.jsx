import React from 'react';
import Chatheader from './Chatheader';
import { Box } from '@mui/material';
import ChatArea from './ChatArea';
import Footer from './Footer';

const Chatbox = ({ roomData, handleSendmsg ,allMsg ,user}) => {
  return (
    <Box sx={{ width: "45vw", display: "flex", height: "100%", flexDirection: "column" }}>
      {roomData.room ? (
        <>
          <Chatheader roomData={roomData} />
          <ChatArea allMsg={allMsg} user={user} />
          <Footer handleSendmsg={handleSendmsg} selectedUser={roomData.receiver} />
        </>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <h3>Please select a chat</h3>
        </Box>
      )}
    </Box>
  );
};

export default Chatbox;
