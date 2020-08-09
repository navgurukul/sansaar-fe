import { createSlice } from '@reduxjs/toolkit';

const LayoutSlice = createSlice({
  name: 'layout',
  initialState: {
    mainPaneWidth: null,
  },
  reducers: {
    setMainPaneWidth: (state, action) => {
      state.mainPaneWidth = action.payload;
    }
  }
});

export default LayoutSlice;