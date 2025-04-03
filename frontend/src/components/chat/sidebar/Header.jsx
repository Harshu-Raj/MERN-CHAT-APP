import React from 'react'
import { Card,CardHeader,Avatar,IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Header = ({user}) => {
  return (
    <Card sx={{ background: "linear-gradient(135deg, #FF8008 30%, #FFC837 90%)",borderRadius:0 ,color: "white"}}>
      <CardHeader
      
        avatar={
          <Avatar>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" sx={{color:'white'}}>
            <MoreVertIcon />
          </IconButton>
        }
        title={user.name}
        subheader={<Typography variant="caption">
            {user.email};
        </Typography>}
      />
      </Card>
  )
}

export default Header
