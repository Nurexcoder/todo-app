// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './sclices/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
