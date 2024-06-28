import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import  authReducer  from './authSlice';

const store = configureStore({
    reducer: {
         auth : authReducer,
     }
});

export default store;
