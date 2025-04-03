const express=require('express');
const { Server } = require("socket.io");
const http=require('http');
const cors=require('cors');
const socket=require('./socket/socket')
const app=express();
app.use(cors())
app.use(express.json());
require('dotenv').config();


const server=http.createServer(app);
// const io=new Server(httpServer,{
//     cors:{
//         origin:"http://localhost:5173"
//     },
// });

// io.on("connection",(socket)=>{
// console.log(socket.id)
// console.log('connection done');
// })

const userController=require('./controller/user');
const connnectMongodb = require('./config/db');


app.use('/user',userController,(req,res)=>{
    res.send("Hello");
});

connnectMongodb().then(()=>{
    server.listen(5000,()=>{
        socket(server)
        console.log("server is running at 5000");
    });
    
}).catch((err)=>{
    console.log(err)
});

