import { createSlice } from '@reduxjs/toolkit';
import { LOCALSTORAGE_JWT_KEY } from '../constants';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem(LOCALSTORAGE_JWT_KEY),
    pending: false,
    error: null,
    user: null,
    data:null,
  },
  reducers: {
    startAuthRequest: (state) => {
      state.pending = true;
      state.error = null;
    },
    authFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    authSuccess: (state, action) => {
      const { token, user } = action.payload;
      localStorage.setItem(LOCALSTORAGE_JWT_KEY, token);
      state.user = user;
      state.token = token;
      state.pending = false;
      state.error = null;
    },
  },
});



export default AuthSlice;
