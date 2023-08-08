// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import TodoView from './components/TodoView';

function App() {
  return (
    <div className="h-screen overflow-y-scroll flex flex-col items-center gap-5 bg-slate-100 relative">
      <Navbar />
        
      <TodoView/>
    </div>
  );
}

export default App;
