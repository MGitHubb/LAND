import * as React from 'react';
import { Box, Typography, Grid, Container, Button, TextField} from '@mui/material'
import Modal from '@mui/material/Modal';
import "./RegisterPopup.style.js";
import { useState} from 'react';
import axios from 'axios';
import { useStyles } from './RegisterPopup.style.js';

export default function RegisterModal() {
  const classes = useStyles();
  const [values, setValues] = useState({username:'', email: '', password:''});
  const handleInputChange = e => {
      const {name, value} = e.target
      setValues({
          ...values,
          [name]: value
      })
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  async function onSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:5000/api/users', {
          username: values.username,
          pass: values.password,
          email: values.email
      }).then(res => {
          setOpen(false);
          console.log(`statusCode: ${res.status}`);
          console.log(res);
      }).catch(error => {
        window.alert(error);
        return;
      });
}

  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>Sign up</Button>
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.authBox} sx={{bgcolor: 'background.paper', boxShadow: 24, p: 4}}>
          <Typography variant="h6" component="h2" className={classes.registerText}>
            Sign up
          </Typography>
          <Typography sx={{ mt: 2 }} className={classes.registerText}>
              Sign up so you can sale your land
          </Typography>
          <form>
          <Container>
              <Grid container>
                  <Grid item xs={12} className={classes.gridItem}>
                  <Box className={classes.field}>
                      <TextField
                          variant="filled"
                          label="Username"
                          name="username"
                          value={values.username}
                          onChange={handleInputChange}
                      />
                    </Box>
                    <Box className={classes.field}>
                      <TextField
                          variant="filled"
                          label="Email"
                          name="email"
                          value={values.email}
                          onChange={handleInputChange}
                      />
                    </Box>
                    <Box className={classes.field1}>
                      <TextField
                          variant="filled"
                          label="Password"
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleInputChange}
                      />
                    </Box>
                    <Button onClick={onSubmit} variant="contained" type="submit" color="success" size="large">Register</Button>
                </Grid>
              </Grid>
            </Container>   
          </form>
        </Box>
      </Modal>
    </div>
  );
}