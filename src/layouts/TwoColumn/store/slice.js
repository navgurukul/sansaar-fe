import { createSlice } from '@reduxjs/toolkit';

const LayoutSlice = createSlice({
  name: 'layout',
  initialState: {
    mainPaneWidth: null,
    rightPaneOpen: false,
    mainPaneScrollToTopPending: false,
  },
  reducers: {
    setMainPaneWidth: (state, action) => {
      state.mainPaneWidth = action.payload;
    },
    setRightPaneOpen: (state, action) => {
      state.rightPaneOpen = action.payload;
    },
    setMainPaneScrollToTopPending: (state, action) => {
      state.mainPaneScrollToTopPending = action.payload;
    }
  }
});

export default LayoutSlice;