import * as React from 'react';
import { Box, Typography, Grid, Container, Button, TextField} from '@mui/material'
import Modal from '@mui/material/Modal';
import "./LoginPopup.style.js";
import RegisterPopup from '../Register/RegisterPopup'
import { useState} from 'react';
import axios from 'axios';
import { useStyles } from './LoginPopup.style.js';

export default function LoginModal({setIsLogged}) {
  const [err, setErr]= useState("");
  const [registerPopup, setRegisterPopup]= useState(false);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({username:'', password:''});

  const handleInputChange = e => {
      const {name, value} = e.target
      setValues({
          ...values,
          [name]: value
      })
  }
  
  const classes = useStyles();
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  async function onSubmit(e) {
    e.preventDefault();

    if(values.username.trim().length !== 0 && values.password.trim().length !== 0) {
      axios.post('http://localhost:5000/api/users/login', {
            username: values.username,
            pass: values.password,
        }).then(res => {
            if(res.data.token){
              setOpen(false);
              window.localStorage.setItem("token", res.data.token);
              setIsLogged(true);
            }
            else{
              if(res.data.message === "Wrong password!"){
                setErr("Wrong password!");
              }
              else{
                if(res.data.message === "User not found!"){
                  setErr("User not found!");
                }
              }
            }
            console.log(`statusCode: ${res.status}`);
            console.log(res);
        }).catch(error => {
          window.alert(error);
          return;
        });
    }
}

  return (
    <div>
      <Button onClick={handleOpen} color="inherit">Log in</Button>
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.authBox} sx={{bgcolor: 'background.paper', boxShadow: 24, p: 4}}>
          <Typography variant="h6" className={classes.loginText}>
            Log in
          </Typography>
          <Typography sx={{ mt: 2 }} className={classes.loginText}>
              Log in so you can sale your land
          </Typography>
          <form>
          <Container>
            <Grid container>
              <Grid item xs={12} className={classes.gridItem}>
                <Box className={classes.field1}>
                  <TextField
                      variant="filled"
                      label="Username"
                      name="username"
                      value={values.username}
                      onChange={handleInputChange}
                  />
                </Box>
                <Box className={classes.field2}>
                  <TextField
                      variant="filled"
                      label="Password"
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleInputChange}
                  />
                </Box>
                  <Button onClick={onSubmit} sx={{mb: 2}} variant="contained" type="submit" color="success" size="large">Login</Button>
                <Box >
                  <Typography>You don't have an account? </Typography>
                  <Typography color="error"> {err} </Typography>
                  <RegisterPopup trigger={registerPopup} setTrigger={setRegisterPopup}></RegisterPopup>
                </Box>
              </Grid>
            </Grid>
          </Container>   
        </form>
        </Box>
      </Modal>
    </div>
  );
}
