const mongoose=require("mongoose");

// now we will build schema

const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
})

module.exports=mongoose.model('User',userSchema);
// by default mongodb make model name to lower case and in plural form that is schema would be stored with the name users