import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
axios.defaults.withCredentials = true;
const Login = () => {
  const dispatch=useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const history = useNavigate();
  const sendRequest = async () => {
    //post is an axios function which have two parameters url and the data (it is used to send http request)
    //login request will provide us a token from backend and it will be attached to the cookie
    const axiosInstance = axios.create({
      withCredentials: true
   })
     await axiosInstance
      .post("http://localhost:5000/api/login", {
        email: inputs.email,
        password: inputs.password,
      },)
      .catch((err) => console.log(err));
    const data = await axiosInstance.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => dispatch(authActions.login())).then(()=>history("/user"));
    console.log(inputs);
  };
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width={300}
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection={"column"}
        >
          <Typography variant="h2">Login</Typography>

          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type="email"
            variant="outlined"
            placeholder="email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type="password"
            variant="outlined"
            placeholder="password"
            margin="normal"
          />
          <Button variant="contained" color="success" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
