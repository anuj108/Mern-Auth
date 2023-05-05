import React,{useState} from "react";
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios'
import { useNavigate } from "react-router";
axios.defaults.withCredentials = true;
const Signup = () => {
  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    password:"",
  })
  const history = useNavigate();
  const sendRequest=async()=>{
    //post is an axios function which have two parameters url and the data (it is used to send http request)
    const res=axios.post('https://odd-teal-llama-garb.cyclic.app/api/signup',{
      name:inputs.name,
      email:inputs.email,
      password:inputs.password,
    }).catch((err)=>console.log(err));
    const data=await res.data;
    return data;
  }

    const handleSubmit=(e)=>{
      e.preventDefault();
      sendRequest().then(()=>history("/login"));
      console.log(inputs);
    };
    const handleChange=(e)=>{
      setInputs((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
      }))
      
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box marginLeft="auto" marginRight="auto" width={300} justifyContent="center" alignItems="center" display="flex" flexDirection={"column"}>
        <Typography variant="h2">Signup</Typography>

            <TextField name="name" onChange={handleChange} value={inputs.name} type="text" variant="outlined" placeholder="name" margin="normal"/>
            <TextField name="email" onChange={handleChange} value={inputs.email} type="email" variant="outlined" placeholder="email" margin="normal"/>
            <TextField name="password" onChange={handleChange} value={inputs.password} type="password" variant="outlined" placeholder="password" margin="normal"/>
            <Button variant="contained" color="success" type="submit">Signup</Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
