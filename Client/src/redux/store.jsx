import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { authSliceReducer } from './authSlice';

const store = configureStore({
    reducer: { rootReducer, authSliceReducer }
});

export default store;
