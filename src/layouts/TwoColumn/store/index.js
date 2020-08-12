import get from 'lodash/get';
import LayoutSlice from './slice';

const selectors = {
  selectMainPaneWidth: (state) => get(state, `${LayoutSlice.name}.mainPaneWidth`),
  selectRightPaneOpen: (state) => get(state, `${LayoutSlice.name}.rightPaneOpen`)
}

export const { setMainPaneWidth, setRightPaneOpen } = LayoutSlice.actions;

export { LayoutSlice, selectors }