import { createSlice } from '@reduxjs/toolkit';

const User = createSlice({
    name: 'UserData',
    initialState: {
      pending: false,
      error: null,
      data:null,
    },
    reducers: {
      startFetchRequest: (state) => {
        state.pending = true;
        state.error = null;
      },
      fetchFailure: (state, action) => {
        state.pending = false;
        state.error = action.payload;
      },
      fetchSuccess: (state, action) => {
        const data = action.payload;
        state.data = data;
        state.pending = false;
        state.error = null;
      },
    },
  });

  export default User