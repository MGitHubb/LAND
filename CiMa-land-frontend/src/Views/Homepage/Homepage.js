import * as React from 'react';
import { useState} from 'react';
import { Container, Typography, Box, Input } from '@mui/material';
import LandNavbar from '../../Components/Navbar/Navbar';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import './Homepage.style.js';
import ImageList from '@mui/material/ImageListItem';
import ImageListItem from '@mui/material/ImageListItem';
import { itemData } from '../../DefaultValues';
import { useStyles } from './Homepage.style.js';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const classes = useStyles();

  // Input Field handler
  const handleSearchInput = (e) => {
    setInputValue(e.target.value);
  };

  // Reset Input Field handler
  const resetInputField = () => {
    setInputValue("");
  };

  function goToPosts() {
    navigate("/posts", { state: { searchButton: true, inputValue: inputValue } });
  }

  return (
  <Box>
    <header>
      <LandNavbar />
    </header>
    <main>
      <Box className={classes.content}>
        <Box className={classes.column1}>
          <Container maxWidth="lg">
            <Typography className={classes.findLand} variant="h3" gutterBottom>Find your land...</Typography>
            <Box className={classes.search}>
              <Box className={classes.icon}>
                <SearchIcon fontSize="large" color="success" onClick={goToPosts}></SearchIcon>
              </Box>
              <Box className={classes.input}>
                <Input fullWidth  type="text" value={inputValue} placeholder='Search by location' onChange={handleSearchInput} />
              </Box>
              <span className={classes.clear} onClick={resetInputField}>
                <ClearIcon></ClearIcon>
              </span>
            </Box>
            <Typography variant="h6" align="left" color="textSecondary" paragraph>Search land for sale including vacant land, rural <br></br> property, farm acreage, and buildable lots.</Typography>
          </Container>
          </Box>
          <Box className={classes.column2}>
          <Box sx={{ width: 500, height: 400, overflowY: 'hidden' }}>
          <ImageList variant="masonry" cols={2} gap={8}>
            {itemData.map((item) => (
              <ImageListItem key={item.id}>
                <img
                  className={classes.image}
                  src={`${item.img}`}
                  srcSet={`${item.img}`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        </Box>
      </Box>
    </main>
  </Box>
  );
}

export default HomePage;