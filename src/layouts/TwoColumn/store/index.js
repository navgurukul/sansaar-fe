import LayoutSlice from './slice';
import * as selectors from './selectors';

export const {
  setMainPaneWidth,
  setRightPaneOpen,
  setMainPaneScrollToTopPending,
  setMainPaneLoading,
  setRightPaneLoading,
} = LayoutSlice.actions;

export { LayoutSlice, selectors }