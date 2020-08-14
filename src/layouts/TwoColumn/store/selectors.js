import get from 'lodash/get';
import LayoutSlice from './slice';

export const selectMainPaneWidth = (state) => get(state, `${LayoutSlice.name}.mainPaneWidth`);
export const selectRightPaneOpen = (state) => get(state, `${LayoutSlice.name}.rightPaneOpen`);
export const selectMainPaneScrollToTopPending = (state) => get(state, `${LayoutSlice.name}.mainPaneScrollToTopPending`);
export const selectRightPaneLoading = (state) => get(state, `${LayoutSlice.name}.rightPaneLoading`);
export const selectMainPaneLoading = (state) => get(state, `${LayoutSlice.name}.mainPaneLoading`);