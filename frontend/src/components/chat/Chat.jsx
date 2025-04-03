import { Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Profile from "./profile/Profile";
import Chatbox from "./chatbox/Chatbox";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const PATH = "http://localhost:5000";

const Chat = () => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomData, setRoomData] = useState({ room: null, receiver: null });
  const navigate = useNavigate();
  const { state } = useLocation();
  const [onlineUser, setOnlineUser] = useState([]);
  const [messages, setMessages] = useState([]); 
  const [allMsg, setAllMsg] = useState([]); // Store all messages as an array

  useEffect(() => {
    if (!state) {
      navigate("/");
      return;
    }

    const socket = io.connect(PATH);
    socketRef.current = socket;

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [navigate, state]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("ADD_USER", state);
    }
  }, [isConnected]);

  useEffect(() => {
    if (!state || !isConnected || !socketRef.current) return;

    socketRef.current.emit("ADD_USER", state);
    socketRef.current.on("USER_ADDED", (data) => {
      console.log("User added:", data);
      setOnlineUser(data);
    });

    socketRef.current.on("RECEIVED_MESSAGE", (msg) => {
      console.log("Message received:", msg);

      setMessages((prev) => [...prev, msg]); // Add message to messages array
      setAllMsg((prev) => [...prev, msg]); // Store message in allMsg array
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("USER_ADDED");
        socketRef.current.off("RECEIVED_MESSAGE");
      }
    };
  }, [isConnected, state]);

  if (!state) return null;

  const handleSendmsg = (msg) => {
    if (!roomData.receiver || !msg.text.trim()) {
      console.error("Error: No receiver selected or empty message!");
      return;
    }

    const senderName = state.name;
    const receiverName = roomData.receiver.name;

    const messageObject = {
      senderId: state._id,
      senderName: senderName,
      receiverId: roomData.receiver._id,
      receiverName: receiverName,
      text: msg.text,
    };

    console.log("Sending message:", messageObject);

    setMessages((prev) => [...prev, messageObject]); // Append to messages array
    setAllMsg((prev) => [...prev, messageObject]); // Append to allMsg array

    socketRef.current.emit("SEND_MSG", messageObject);
  };

  console.log("All Messages:", allMsg);

  return (
    <Paper elevation={0} square sx={{ height: "100vh", display: "flex" }}>
      <Sidebar 
        user={state} 
        onlineUser={onlineUser} 
        setRoomData={setRoomData} 
        roomData={roomData} 
      />
      <Chatbox 
        roomData={roomData} 
        handleSendmsg={handleSendmsg} 
        allMsg={allMsg} 
        user={state}
      />
      <Profile user={state} />
    </Paper>
  );
};

export default Chat;
