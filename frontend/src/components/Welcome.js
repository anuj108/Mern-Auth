import React, { useState, useEffect } from "react";
import axios from "axios";
// let firstRender=true;//using this in useEffect we want to have token in first go and refresh token in other
const Welcome = () => {
  const [user, setUser] = useState();
  // const refreshToken=async()=>{
  //   const res=await axios.get("http://localhost:5000/api/refresh",{
  //     withCredentials:true,
  //   }).catch(err=>console.log(err));
  //   const data=await res.data;
  //   return data;
  // }
  const sendRequest = async () => {
    const res = await axios
      .get("https://odd-teal-llama-garb.cyclic.app/api/user", {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
      });
    const data = await res.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  // useEffect(() => {
  //   if(firstRender)
  //   {
  //     firstRender=false;
  //     sendRequest().then((data)=>setUser(data.user));
  //   }
  //   let interval=setInterval(() => {
  //     refreshToken().then(data=>setUser(data.user))
  //   }, 1000*29  );
  //   return()=>clearInterval(interval)
  // }, [])
  return <div>Welcome {user && <h1>{user.name}</h1>}</div>;
};

export default Welcome;
