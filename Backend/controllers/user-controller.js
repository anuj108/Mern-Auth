//this file will contain functions which will control the routing operations

const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "dustin404";
// req will we get from client, res will be sent from the server, next is used to move to the next middleware
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  //if we encounter same email again it will send request, to stop or validate(user already exists) that we will use validations

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists, login instead" });
  }
  //password hashed using hashSync function
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    // here comes the object in json format

    //three ways to write
    // name:req.body.name,
    // email: req.body.email,
    // password: req.body.password,

    // name:name,
    // email:email,
    // password: password,

    //es6
    name, // acts like name: name only if key value pair have same name
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    //save is present in mongoose to save the document
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};
//------------------------------------------------------

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
    // if error no forward processes
  }
  if (!existingUser) {
    return res.status(400).json({ message: "user not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password); //synchronously compare the password and return boolean
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: " invalid password" });
  }
  //jwt.sign() function in jwt to generate token

  const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
    expiresIn: "30s",
  });

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30),
    // if httponly is written , it will not be accesible to the frontend
    httpOnly: true,
    sameSite: "lax", //idk
  });

  return res
    .status(200)
    .json({ message: "success", user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie; //cookies in header stored will come here
  const token = cookies.split("=")[1]; //1st index after equals to
  console.log(token);
  // console.log(cookies); //userid=token
  //   const headers = req.headers["authorization"];
  //   // verification below
  //   // we have split and done this because headers is the string which contains token with a special word bearer in front of it .. to separate that we have done this
  //   const token = headers.split(" ")[1];
  //   // console.log(token);
  if (!token) {
    res.status(404).json({ message: "NO TOKEN FOUND" });
  }
  //verify function
  jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    }
    // console.log(user);  //id: ,iat: ,exp:
    // console.log(req.id);  //undefined;
    //to send userid to getuser middleware we write req.id=user.id
    req.id = user.id; //req is an object
  });
  next();//moving to next middleware which is getuser , see in userroutes
};

//getting user information after token verification
const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password"); //minus password means we are bringing everything except password
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  return res.status(200).json({ user });
};

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
// left signup is the name from which it is been exported and right one is the name of the function variable declared above