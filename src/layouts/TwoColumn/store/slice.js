import { createSlice } from '@reduxjs/toolkit';

const LayoutSlice = createSlice({
  name: 'layout',
  initialState: {
    mainPaneWidth: null,
    rightPaneOpen: false,
  },
  reducers: {
    setMainPaneWidth: (state, action) => {
      state.mainPaneWidth = action.payload;
    },
    setRightPaneOpen: (state, action) => {
      state.rightPaneOpen = action.payload;
    }
  }
});

export default LayoutSlice;