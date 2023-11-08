const mongoose = require("mongoose")

// mehulkothari1706

require('dotenv').config()
console.log("MONGODBURI:", process.env.MONGODBURI);

// mongoose.connect("mongodb://127.0.0.1:27017/LoginSignup")
// mongoose.connect(`${process.env.MONGODBURI}/test`) 
mongoose.connect(process.env.MONGODBURI)
 
.then(()=>{
    console.log("mongodb connected");
})
.catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
})


const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true  
    },
    tel:{
        type:String,
        required:true
    },
    msgContent:{
        type:String,
        required:true
    }
})


const collection = new mongoose.model("LoginCollection",LoginSchema)

module.exports=collection 