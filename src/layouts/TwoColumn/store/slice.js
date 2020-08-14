import { createSlice } from '@reduxjs/toolkit';

const LayoutSlice = createSlice({
  name: 'layout',
  initialState: {
    mainPaneWidth: null,
    rightPaneOpen: false,
    mainPaneScrollToTopPending: false,
    rightPaneLoading: false,
    mainPaneLoading: false,
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
    },
    setRightPaneLoading: (state, action) => {
      state.rightPaneLoading = action.payload;
    },
    setMainPaneLoading: (state, action) => {
      state.mainPaneLoading = action.payload;
    }
  }
});

export default LayoutSlice;