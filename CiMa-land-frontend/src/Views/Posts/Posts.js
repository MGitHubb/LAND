import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Container, Button} from '@mui/material'
import axios from 'axios';
import LandNavbar from '../../Components/Navbar/Navbar';
import { useStyles } from './Posts.style';
import { useLocation, useNavigate } from 'react-router-dom';
import {AdvancedImage} from '@cloudinary/react';
import { cld } from '../../DefaultValues';

function Posts() {
  let [records, setRecords] = useState([]);
  const { state } = useLocation();
  const { searchButton, inputValue } = state;
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    if(searchButton){
      async function getRecords() {
        await axios.get(`http://localhost:5000/api/sales/location/${inputValue}`)
          .then(records => {
            console.log(records.data);
            setRecords(records.data);
            console.log(`statusCode searchByLocation: ${records.status}`);
        }).catch(error => {
            window.alert(error.message);
        });
      }  
      getRecords();

    } else {
      async function getRecords() {
        await axios.get('http://localhost:5000/api/sales')
          .then(records => {
            console.log(records.data);
            setRecords(records.data);
            console.log(`statusCode Posts: ${records.status}`);
        }).catch(error => {
            window.alert(error.message);
        });
      }
      getRecords();
    }

    return;
    
  }, [inputValue, searchButton]);

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
            <Typography variant="h3" color="textPrimary" className={classes.title} gutterBottom>All posts</Typography>
            <Typography variant="h6" color="textSecondary" className={classes.subtitle} paragraph>Here you can find the perfect land for you.</Typography>
          
          </Container>
          </Box>
          <Box>
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

  export default Posts;