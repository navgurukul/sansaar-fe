import get from 'lodash/get';
import LayoutSlice from './slice';

const selectors = {
  selectMainPaneWidth: (state) => get(state, `${LayoutSlice.name}.mainPaneWidth`),
  selectRightPaneOpen: (state) => get(state, `${LayoutSlice.name}.rightPaneOpen`),
  selectMainPaneScrollToTopPending: (state) => get(state, `${LayoutSlice.name}.mainPaneScrollToTopPending`)
}

export const { setMainPaneWidth, setRightPaneOpen, setMainPaneScrollToTopPending } = LayoutSlice.actions;

export { LayoutSlice, selectors }