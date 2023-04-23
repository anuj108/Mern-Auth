//this file will contain functions which will control the routing operations

const User=require('../model/User');
const bcrypt=require('bcryptjs');

// req will we get from client, res will be sent from the server, next is used to move to the next middleware
const signup=async(req,res,next)=>{
    const {name,email,password}=req.body;
    //if we encounter same email again it will send request, to stop or validate(user already exists) that we will use validations
    
    let existingUser;
    try{
        existingUser=await User.findOne({email:email});

    }
    catch(err){
        console.log(err);
    }
    if(existingUser)
    {
        return res.status(400).json({message:"User already exists, login instead"});
    }
    //password hashed using hashSync function
    const hashedPassword=bcrypt.hashSync(password);

    const user=new User({
        // here comes the object in json format

        //three ways to write
        // name:req.body.name,
        // email: req.body.email,
        // password: req.body.password,

        // name:name,
        // email:email,
        // password: password,

        //es6
        name,// acts like name: name only if key value pair have same name
        email,
        password:hashedPassword,
    });

    try{
        await user.save();
        //save is present in mongoose to save the document
    }
    catch(err)
    {
        console.log(err);
    }
    return res.status(201).json({message:user})
}
//------------------------------------------------------

const login =async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email:email});
    }
    catch(err)
    {
        return new Error(err); 
        // if error no forward processes
    }
    if(!existingUser)
    {
        return res.status(400).json({message:"user not found"});
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)//synchronously compare the password and return boolean
    if(!isPasswordCorrect)
    {
        return res.status(400).json({message:" invalid password"});
    }
    return res.status(200).json({message:"success"});


}
exports.signup=signup;
exports.login =login;
// left signup is the name from which it is been exported and right one is the name of the function variable declared above