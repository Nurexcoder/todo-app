// src/App.js
import React from 'react';
import MainPage from './pages/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTodoPage from './pages/AddTodoPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import TryPremiumModal from './components/TryPremiumModal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<MainPage />} />
        <Route path='/add' element={<AddTodoPage />} />
        <Route path='/login' element={<TryPremiumModal />} />
        <Route path='/' element={<LandingPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
