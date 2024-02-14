import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Container, Button} from '@mui/material'
import axios from 'axios';
import LandNavbar from '../../Components/Navbar/Navbar';
import { useStyles } from './Profile.style';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function Profile() {
  let [records, setRecords] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const decoded = jwtDecode(token);
  let sales_data = [];
  let ok=0;

  useEffect(() => {
      async function getRecords() {
        if(ok===0) {
        await axios.get(`http://localhost:5000/api/posts/sids/${decoded.user.uid}`)
          .then(sids => {
            for (let i = 0; i < sids.data.length; i++) {
              axios.get(`http://localhost:5000/api/sales/${sids.data[i].sid}`)
              .then(sale => {
                sales_data.push(sale.data[0]);
              }).catch(error => {
                  window.alert(error.message);
              });
            }

          console.log(sales_data);
          setRecords(sales_data);    
          console.log(`statusCode sids: ${sids.status}`);
        }).catch(error => {
            window.alert(error.message);
        });
      }
    }
      getRecords();
      ok=1;
    return;
    
  }, []);

  const splitImg = (image) => {
    if(image) {
      return image.split(' ')[0];
    }
  }

  const goToViewPost = (event, sid) => {
    navigate(`/viewpost/${sid}`);
  };

    return (
      <>
        <CssBaseline />
        <header>
            <LandNavbar />
        </header>
        <main>
         <Box>
          <Container maxWidth="sm">
            <Typography variant="h3" color="textPrimary" className={classes.title} gutterBottom>{decoded.user.username}'s profile</Typography>
            <Typography variant="h6" color="textSecondary" className={classes.subtitle} paragraph>Manage your posts here</Typography>
          
          </Container>
          </Box>
          <Box p>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={4} className={classes.cardGrid}>
                {records.map((record) => (
                  <Grid item key={record._id} xs={12} sm={6} md={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className = {classes.cardMedia}
                      image = {splitImg(record.image)}
                      title = "trip title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5">
                        {record.title}
                      </Typography>
                      <Typography>
                        Location: {record.address} <br></br>
                        Price: {record.price} <br></br>
                        Size: {record.size} <br></br>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button color="primary" className={classes.viewButton} onClick={event => goToViewPost(event, record.sid)}>View</Button>
                    </CardActions>
                  </Card>
                </Grid>
                ))}
              </Grid>

            </Container>
          </Box>
        </main>
      </>    
    );
  }


  export default Profile;