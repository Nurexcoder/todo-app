// src/components/LandingPage.js
import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { signInWithGoogle } from '../sclices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.reducer.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (auth?.user) {
      navigate('/home')
    }
  }, [auth?.user])

  return (
    <div className="flex justify-center items-center min-h-screen bg-main">
      <div className="max-w-lg p-6 bg-secondary rounded-lg shadow-md grid gap-5">
        <h1 className="text-3xl font-semibold mb-4 text-center text-gray-600">
          Welcome to Todo App
        </h1>
        <p className="text-center text-gray-600">
          Start managing your tasks efficiently using our Todo App.
        </p>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Google />}
          onClick={() => dispatch(signInWithGoogle())}
          className="mt-6 w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-300"
        >
          Sign Up with Google
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
