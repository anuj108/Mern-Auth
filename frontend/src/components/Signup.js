import React,{useState} from "react";
import { Box, Button, TextField, Typography } from '@mui/material';

const Signup = () => {
  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    password:"",
  })
    const handleSubmit=(e)=>{
      e.preventDefault();
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
