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
      const { userToken, user } = action.payload;
      localStorage.setItem(LOCALSTORAGE_JWT_KEY, userToken);
      state.user = user;
      state.token = userToken;
      state.pending = false;
      state.error = null;
    },
    fetchedDatafromSlice: (state, action) => {
      const data = action.payload;
      state.data = data;
      state.pending = false;
      state.error = null;
    },
  },
});



export default AuthSlice;
