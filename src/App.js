// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center gap-10 bg-slate-100">
      <Navbar />
      
    </div>
  );
}

export default App;
