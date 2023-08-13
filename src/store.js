import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can choose different storage options
import thunk from 'redux-thunk'
import todoReducer from './sclices/todoSlice';
import authReducer from './sclices/authSlice';

const persistConfig = {
  key: 'root', // Key for the storage
  storage,
};



const persistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedReducer,
  todos: todoReducer
})

export const store = configureStore({
  reducer: {
    reducer: rootReducer,

  },
  middleware: [thunk]
});

export const persistor = persistStore(store);
