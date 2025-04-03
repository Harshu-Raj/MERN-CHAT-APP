
import { Box, Chip, ListItem, Stack ,List,ListItemAvatar, Avatar, ListItemText, Typography,Paper, IconButton} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import React from 'react'

const ChatArea = ({allMsg,user}) => {
  return (
    <Box sx={{height:'100%',overflowY:"auto"}}>
      <Stack direction="row" justifyContent='center' sx={{position:"sticky",py:2,top:0,zIndex:2 ,background:'#f9f9f9'}}>
        <Chip label="Today"/>
      </Stack>
      <List sx={{p:0,overflowY:"auto",flex:'1 0 0'}} >
      {Object.values(allMsg).map((item) => (
        
    <ListItem  key={item.id} sx={item.senderId===user._id? {flexDirection:'row-reverse',mb:2}:{flexDirection:"row",mb:2}}> 
      <Box sx={item.senderId===user._id?{ display: 'flex', width: "80%",flexDirection:"row-reverse" }:{display:'flex',width:"80%",flexDirection:"row"}}>

        <ListItemAvatar sx={item.senderId===user._id?{display:'flex',flexDirection:'row-reverse'}:{display:'flex'}}>
          <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>

        <Paper sx={item.senderId===user._id?{ width: "100%", p: 1.5 }:{width:"100%",p:1.5,background: "linear-gradient(135deg, #FF8008 30%, #FFC837 90%)",color:"white"}}>
          <ListItemText 
            sx={{ m: 0 }}
            primary={item.
              senderName

              } 
            secondary={<Typography variant='body1'>{item.text}</Typography>}
          />

          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1
          }}>
            <Typography variant='caption'>{new Date().toLocaleTimeString()}</Typography>
            <Box>
              <IconButton size='small'>
                <ReplyIcon fontSize='small' />
              </IconButton>
              <IconButton size='small' color='error'>
                <DeleteOutlineIcon fontSize='small' />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ListItem>
))}

         

        

      </List>


    </Box>
  )
}

export default ChatArea
