import React from "react";
import { Box, Button, TextField, Typography } from '@mui/material';

const Signup = () => {
    const handleSubmit=()=>{};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box marginLeft="auto" marginRight="auto" width={300} justifyContent="center" alignItems="center" display="flex" flexDirection={"column"}>
        <Typography variant="h2">Signup</Typography>

            <TextField variant="outlined" placeholder="name" margin="normal"/>
            <TextField variant="outlined" placeholder="email" margin="normal"/>
            <TextField variant="outlined" placeholder="password" margin="normal"/>
            <Button variant="contained" color="success" type="submit">Signup</Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
