import React, {useState} from 'react'
import {Toolbar,Typography,Box,Tabs,Tab} from '@mui/material';
import {AppBar} from '@material-ui/core'
const Header = () => {
    const [value, setValue]=useState(0);
  return (
    <div>
        <AppBar>
            <Toolbar>
                <Typography variant="h3">Mern Auth</Typography>
                <Box sx ={{marginLeft:"auto"}}>
                    <Tabs indicatorColor="primary"  
                    onChange={(e,val)=>{setValue(val)}} value={value} textColor="inherit">
                        <Tab label="Login"/>
                        <Tab label="Signup"/>
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header