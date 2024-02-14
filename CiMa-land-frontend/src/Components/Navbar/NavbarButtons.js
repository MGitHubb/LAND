import * as React from 'react';
import Button from '@mui/material/Button';
import LoginPopup from '../Login/LoginPopup';
import RegisterPopup from '../Register/RegisterPopup';
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NavbarButtons () {
    const [isLogged, setIsLogged] = useState(false);
    let navigate=useNavigate();

    useEffect(() => {
        if(window.localStorage.getItem('token')){
            setIsLogged(true);
        }
    }, [])

    function goToAddPost () {
        navigate("/dashboard/addpost");
    }

    function goToProfile () {
        navigate("/dashboard/profile");
    }

    function logOut () {
        window.localStorage.removeItem('token');
        setIsLogged(false);
        navigate("/");
    }

    return isLogged ? (
        <>
            <Button onClick={goToAddPost} color="inherit">Add Post</Button>
            <Button onClick={goToProfile} color="inherit">Profile</Button>
            <Button onClick={logOut} color="inherit">Log out</Button>
        </>
    ) : <>
        <LoginPopup setIsLogged={setIsLogged}></LoginPopup>
        <RegisterPopup></RegisterPopup>
        </>
}