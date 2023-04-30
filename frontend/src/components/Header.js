import React, { useState } from "react";
import { Toolbar, Typography, Box, Tabs, Tab } from "@mui/material";
import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">Mern Auth</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="primary"
              onChange={(e, val) => {
                setValue(val);
              }}
              value={value}
              textColor="inherit"
            >
              <Tab to="/login" LinkComponent={Link} label="Login" />
              <Tab to="/signup" LinkComponent={Link} label="Signup" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
