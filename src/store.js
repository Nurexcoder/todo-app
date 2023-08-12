import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can choose different storage options
import thunk from 'redux-thunk'
import todoReducer from './sclices/todoSlice';
import authReducer from './sclices/authSlice';

const persistConfig = {
  key: 'root', // Key for the storage
  storage,     // Storage type (e.g., localStorage)
  // You can also configure whitelist or blacklist for reducers
};


const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: {
    reducer: persistedReducer,

  },
  middleware: [thunk]
});

export const persistor = persistStore(store);
