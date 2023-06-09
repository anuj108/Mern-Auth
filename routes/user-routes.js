//now we will make routes to interact with the database

const express = require("express");
const {
  signup,
  login,
  verifyToken,
  getUser,
  logout,
} = require("../controllers/user-controller");
//brackets because we have to to define what we are importing

const router = express.Router(); //router is a function imported
// router holds reference of Router

//basic
// router.get('/',(req,res,next)=>{
//     res.send("Hello")
// })

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.post("/logout", verifyToken, logout);
// router.get('/refresh',refreshToken,verifyToken,getUser)//refresh token
module.exports = router;
