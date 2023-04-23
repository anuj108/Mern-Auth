const express = require('express');// express file is imported using require
const mongoose=require('mongoose');// importing mongoose
const router=require("./routes/user-routes");

const app=express();// app variable now have all functionality of express
app.use(express.json());//this line will get to know that the upcoming data is json data
app.use('/api',router);

// it will return promise so we are using then (whenever the connection is entablished or promise is returned then then statement will work)
mongoose.connect("mongodb+srv://admin:dustin404@cluster0.igwwshu.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    app.listen(5000);
    console.log("DATABASE IS CONNECTED AND I AM LISTENING TO PORT 5000");
}).catch((err)=>{
    console.log(err);
});




//some basics
// app.use('/',(req,res,next)=>{
//     res.send("HELLO THERE");
// });// default route


//This is how we create a server
// app.listen(5000,()=>
// {
//     console.log("listening to port 5000")
// })