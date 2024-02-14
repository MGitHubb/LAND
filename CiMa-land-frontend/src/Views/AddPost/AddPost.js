import * as React from 'react';
import { useState} from 'react';
import { Container, Typography, Box, TextField, Grid, Button } from '@mui/material';
import LandNavbar from '../../Components/Navbar/Navbar';
import './AddPost.style.js';
import { useStyles } from './AddPost.style.js';
import InitMap from '../../Components/Map/Map';
import axios from 'axios';
import Dropzone from '../../Components/Dropzone/Dropzone';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


const initialFieldValues = {
    title:'',
    address:'',
    price:'',
    size:'',
    description:''
}

function AddPost(){
    const classes = useStyles();
    const [values, setValues] = useState(initialFieldValues);
    const [mapValues, setMapValues] = useState({lat: 45.9432, lng: 24.9668});
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    let formData = new FormData();
    let sid;
    let bla = 0;
    let image;

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    
    async function onSubmit(e) {
        e.preventDefault();
        
        for(let i=0; i<images.length; i++) {
            formData.append(`image`, images[i]);
        }
        
        //uploading image in cloudinary
        await axios.post('http://localhost:5000/api/sales/upload', formData,
        {
            headers: {
                'Authorization': `Basic ${window.localStorage.getItem("token")}`,
                'Content-Type': 'multipart/form-data'
            }

        }).then(res => {
            bla = 1;
            console.log(`statusCode for image transfer: ${res.status}`);
            console.log(`image: `, res);
            console.log(`res: ${res}`);
            image = res.data.image_url;

        }).catch(error => {
            console.log(`image transfer failed`);
            window.alert(error);
            return;
        });

        if (bla === 1){
            bla = 0;

            //adding new sale in database
            await axios.post('http://localhost:5000/api/sales', {
                title: values.title,
                address: values.address,
                price: values.price,
                size: values.size,
                description: values.description,
                latitude: mapValues.lat,
                longitude: mapValues.lng,
                image: image
            },{

                headers: {
                    'Authorization': `Basic ${window.localStorage.getItem("token")}`
                }

            }).then(res => {
                console.log(`statusCode for add_sale: ${res.status}`);
                sid = res.data.sid[0];

            }).catch(error => {
                    window.alert(error);
                    return;
            })
        }
        navigate("/posts", { state: { searchButton: false, inputValue: "" } });

        
        // axios.put('http://localhost:5000/api/sales', {
        //     data: formData
        //   },{
        //     headers: {
        //         'Authorization': `Basic ${window.localStorage.getItem("token")}`
        //     }
        //   }).then(res => {
        //     console.log(`statusCode: ${res.status}`);
        //     console.log(res);
        //   }).catch(error => {
        //         window.alert(error);
        //         return;
        //   });
    }

    return (
        <Box className={classes.page}>
          <header>
            <LandNavbar />
          </header>
          <main>
            <Box>
                <Box className={classes.topImage} sx={{ height: 350, overflowY: 'hidden'}} >
                <img
                  className={classes.topImg}
                  src={`https://images.unsplash.com/photo-1589271755419-b813a577ad42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1509&q=80`}
                  srcSet={`https://images.unsplash.com/photo-1589271755419-b813a577ad42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1509&q=80`}
                  alt="smth"
                  loading="lazy"
                />
                </Box>
            </Box>
            <Box className={classes.title}>
                <Typography variant="h5" color="textSecondary" paragraph>ADD LAND FOR SALE</Typography>
            </Box>
            <Box className={classes.content}>
                <Box className={classes.column1} >
                <Typography variant="h6" color="textSecondary" paragraph>Land details</Typography>
                    <Container maxWidth="md">
                        <Grid container>
                            <Grid item >
                                <Box className={classes.field}>
                                <Typography  color="textSecondary" paragraph>Give your post a title</Typography>
                                <TextField className={classes.field}
                                    variant="filled"
                                    label="Title"
                                    name="title"
                                    value={values.username}
                                    onChange={handleInputChange}
                                />
                                </Box>
                                <Box className={classes.field}>
                                <Typography  color="textSecondary" paragraph>What's the address of your land?</Typography>
                                <TextField className={classes.field}
                                    variant="filled"
                                    label="Address"
                                    name="address"
                                    value={values.username}
                                    onChange={handleInputChange}
                                />
                                </Box>
                                <Box className={classes.field}>
                                <Typography  color="textSecondary" paragraph>How much does it cost? (euro)</Typography>
                                <TextField className={classes.field}
                                    variant="filled"
                                    label="Price"
                                    name="price"
                                    value={values.password}
                                    onChange={handleInputChange}
                                />
                                </Box>
                                <Box className={classes.field}>
                                <Typography  color="textSecondary" paragraph>How big is it? (hectares)</Typography>
                                <TextField className={classes.field}
                                    variant="filled"
                                    label="Size"
                                    name="size"
                                    value={values.password}
                                    onChange={handleInputChange}
                                />
                                </Box>
                                <Box className={classes.field1}>
                                <Typography  color="textSecondary" paragraph>Tell users more about your land</Typography>
                                <TextField className={classes.field}
                                    multiline
                                    rows={10}
                                    variant="filled"
                                    label="Description"
                                    name="description"
                                    value={values.password}
                                    onChange={handleInputChange}
                                />
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Box className={classes.column2}>
                <Typography variant="h6" color="textSecondary" paragraph>Pinpoint the location of your land</Typography>
                    <Box sx={{  overflowY: 'hidden' }} className={classes.initMap}>
                        <InitMap setValues={setMapValues}/>
                    </Box>
                    <Typography variant="h6" color="textSecondary" paragraph>Show users your land</Typography>
                    <Dropzone setImages={setImages}/>
                </Box>
            </Box>
            <Box className={classes.addPostButton}>
                <Button onClick={onSubmit} variant="contained" type="submit" color="success" size="large">Add Post</Button>
            </Box>
          </main>
        </Box>
    );
}

export default AddPost;