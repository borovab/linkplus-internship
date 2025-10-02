import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
} from "@mui/material";

const LayoutComp = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="white">
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          

         
            <Box>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button component={Link} to="/users" color="inherit">
                Users
              </Button>
          
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default LayoutComp;
