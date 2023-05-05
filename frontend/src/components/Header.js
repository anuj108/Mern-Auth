import React, { useState } from "react";
import { Toolbar, Typography, Box, Tabs, Tab } from "@mui/material";
import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authActions } from "../store/index";
import { useDispatch } from "react-redux";
import axios from "axios";

axios.defaults.withCredentials = true;
const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      alert("yes")
      return res;
    }
    alert("not")
    return new Error("Unable to logout");
  };
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };
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
              {!isLoggedIn && (
                <>
                  {" "}
                  <Tab to="/login" LinkComponent={Link} label="Login" />
                  <Tab to="/signup" LinkComponent={Link} label="Signup" />
                </>
              )}
              {isLoggedIn && (
                <Tab
                  onClick={handleLogout}
                  to="/"
                  LinkComponent={Link}
                  label="Logout"
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
