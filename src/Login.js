import { Button } from '@mui/material';
import React,{useState,useEffect} from 'react';
// import { auth, provider} from './firebase';
import {auth,provider} from "./firebase"
import { signInWithPopup } from 'firebase/auth';
import './Login.css';

function Login() {

    const signIn = async () => {
        //This is zzzzzz....
        // auth.signInWithPopup(provider).catch((error) => alert(error.message));
        signInWithPopup(auth,provider)
        .then(async (res) => {
          console.log(res.user)
        }).catch(err=>alert(err.message))
    };

  

  return (
    <div className='login'>
      <div className="login__logo">
        <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" alt="" />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login
