import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can choose different storage options
import thunk from 'redux-thunk'
import todoReducer from './sclices/todoSlice';

const persistConfig = {
  key: 'root', // Key for the storage
  storage,     // Storage type (e.g., localStorage)
  // You can also configure whitelist or blacklist for reducers
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = configureStore({
  reducer: {
    todos: persistedReducer,

  },
  middleware:[thunk]
});

export const persistor = persistStore(store);
