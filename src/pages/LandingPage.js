// src/components/LandingPage.js
import React from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';

const LandingPage = () => {
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
          className="mt-6 w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-300"
        >
          Sign Up with Google
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
