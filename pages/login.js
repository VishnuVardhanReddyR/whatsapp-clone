import { Button } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import { auth, provider } from '../firebase';

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

  return (
    <div className="grid items-center justify-center h-screen bg-[#050505]">
      <Head>
          <title>Login</title>
      </Head>

      <div className="flex flex-col p-28 align-center rounded-md shadow-2xl bg-gray-300">
        <img src="/whatsapp-logo.png" className="h-52 w-52 mb-20" />
        <Button variant="outlined" onClick={signIn} className="">Sign in with Google</Button>
      </div>
    </div>
  )
}

export default Login;
