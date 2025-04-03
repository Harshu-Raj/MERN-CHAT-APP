import { Box,Avatar, Typography, Button} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = ({user}) => {
  const navigate=useNavigate();
  const logOut=()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <Box sx={{width:'25vw', display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column' ,mt:3}}>
      <Avatar
      src="https://mui.com/static/images/avatar/2.jpg" 
      sx={{width:'156px',height:'156px'}}/>
      <Typography
      variant='h4'
      sx={{
        textTransform:"uppercase",
        color:'orange',
      }}
      >{user.name}</Typography>
      
      <Typography variant='body2'>{user.email}</Typography>
      <Button onClick={logOut} variant="contained">Logout</Button>
    </Box >
  )
}

export default Profile
