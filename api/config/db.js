const mongoose=require('mongoose')
const PATH= 'mongodb://127.0.0.1:27017/chat'

const connnectMongodb=async()=>{
    try{
       await mongoose.connect(PATH);
       console.log("connect Db");

    }
    catch(error){
        console.log(error)
    }
}
module.exports=connnectMongodb;