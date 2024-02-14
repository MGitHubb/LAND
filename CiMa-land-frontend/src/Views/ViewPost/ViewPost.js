import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper} from '@mui/material'
import axios from 'axios';
import LandNavbar from '../../Components/Navbar/Navbar';
import { useStyles } from './ViewPost.style';
import { useParams } from 'react-router-dom';
import InitMap from '../../Components/Map/ViewMap';
import Carousel from 'react-material-ui-carousel';

const initialRecordValues = {
    title:'',
    address:'',
    price:'',
    size:'',
    description:'',
    image:''
}

const initialInfoValues = {
    username:'',
    email:''
}

function Item(props)
{
    return (
        <Paper>
            <img
                  src={`${props.item}`}
                  srcSet={`${props.item}`}
                  alt={props.item}
                  loading="lazy"
                />
        </Paper>
    )
}

function ViewPost(props) {
    let [records, setRecords] = useState([initialRecordValues]);
    let [userInfo, setUserInfo] = useState([initialInfoValues]);
    let [img_split, setImg_split] = useState([]);
    const classes = useStyles();
    let params = useParams();

    useEffect(() => {
         function getRecords() {
            axios.get(`http://localhost:5000/api/sales/${params.sid}`)
                .then(records => {
                console.log(`bla records.data: `, records.data)
                setRecords(records.data);
                console.log(`statusCode getRecords: ${records.status}`)
                console.log( "SaleInfo: ", records );
                console.log("records.data[0].image: ", records.data[0].image);
                if(records.data[0].image) {
                    setImg_split(records.data[0].image.split(' '));
                    console.log("img_split: ", img_split);
                }
            }).catch(error => {
                window.alert(error.message);
            });
        }

        function getUserInfo() {
            axios.post(`http://localhost:5000/api/posts/user`,
            {
                sid: params.sid
            }).then(res => {
                axios.get(`http://localhost:5000/api/users/${res.data}`
                ).then(records => {
                    setUserInfo(records.data);
                    console.log(`statusCode getUserInfo: ${records.status}`)
                    console.log( "UserInfo: ", records );
                })
            }).catch(error => {
                window.alert(error.message);
            });
        }

        getRecords();
        getUserInfo();

        return;
        
      }, []);

    const [mapisShown, setMapIsShown] = useState(true);
    const [imgisShown, setImgIsShown] = useState(false);

    const handleMapClick = event => {
        setMapIsShown(true);
        setImgIsShown(false);
    };

    const handleImgClick = event => {
        setMapIsShown(false);
        setImgIsShown(true);
    };

    return (
        <>
            <header>
                <LandNavbar />
            </header>
            <Box className={classes.content}>
                <Box className={classes.column1} >
                    <Typography variant="h5" color="#008000" className={classes.title} paragraph>{records[0].title}</Typography>
                    <Box className={classes.options}>
                        <Button color="success" onClick={handleMapClick}>Map</Button>
                        <Button color="success" onClick={handleImgClick}>Images</Button>
                    </Box>
                    <Box sx={{  overflowY: 'hidden' }} className={classes.initMap}>
                        {mapisShown && ( 
                            <InitMap lat={records[0].latitude} lng={records[0].longitude}/>
                        )}
                        {imgisShown && ( 
                            <Carousel>
                                {
                                    img_split.map( (item, i) => <Item key={i} item={item} /> )
                                }
                            </Carousel>
                        )}
                    </Box>
                </Box>
                <Box className={classes.column2} >
                    <Box className={classes.contact} >
                        <Typography variant="h5" color="#008000" className={classes.title} paragraph>Contact</Typography>
                        <Typography variant="h6" color="#008000" paragraph>{userInfo.username}</Typography>
                        <Typography variant="h6" color="#008000" paragraph>{userInfo.email}</Typography>
                    </Box>
                    <Box  className={classes.contact} >
                        <Typography variant="h5" color="#008000" className={classes.title} paragraph>Details</Typography>
                        <Typography variant="h6" color="#008000" paragraph>Price: {records[0].price} lei</Typography>
                        <Typography variant="h6" color="#008000" paragraph>Size: {records[0].size} ha</Typography>
                    </Box>
                    <Box  className={classes.contact} >
                        <Typography variant="h5" color="#008000" className={classes.title} paragraph>Address</Typography>
                        <Typography variant="h6" color="#008000" paragraph>{records[0].address}</Typography>
                    </Box>
                </Box>
                <Box sx={{ width: '50%' }} className={classes.description}>
                    <Typography variant="h5" color="#008000" >Description</Typography><br></br>
                    <Typography  color="#008000" paragraph>{records[0].description}</Typography>
                </Box>
            </Box>
        </>
    );
}

export default ViewPost;