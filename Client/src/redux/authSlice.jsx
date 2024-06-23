import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // console.log("login action");
      state.isAuthenticated = true; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const authSliceReducer = authSlice.reducer;
export const actions = authSlice.actions;
export const selectors = (state) => state.authSliceReducer.isAuthenticated;
