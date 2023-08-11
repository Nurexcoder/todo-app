// src/App.js
import React from 'react';
import MainPage from './pages/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTodoPage from './pages/AddTodoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/add' element={<AddTodoPage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
