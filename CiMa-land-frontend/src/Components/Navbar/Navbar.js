import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NavbarButtons from './NavbarButtons'
import { useNavigate } from 'react-router-dom';

export default function LandNavbar () {
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  function goToPosts() {
    navigate("/posts", { state: { searchButton: false, inputValue: "" } });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography>LAND</Typography>
          <Button color="inherit" onClick={goHome}>Home</Button>
          <Button color="inherit" onClick={goToPosts}>Posts</Button>
          <Typography component="div" sx={{ flexGrow: 1 }}></Typography>
          <NavbarButtons/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}