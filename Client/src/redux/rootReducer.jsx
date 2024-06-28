import { createReducer } from '@reduxjs/toolkit';

const initialState = { isAuthenticated: false };

const rootReducer = createReducer(initialState, builder => {
  builder
    .addCase('register', state => {
      state.isAuthenticated = true;
    })
    .addCase('login', state => {
      state.isAuthenticated = true;
    })
    .addCase('logout', state => {
      state.isAuthenticated = false;
    });
});

export default rootReducer;
