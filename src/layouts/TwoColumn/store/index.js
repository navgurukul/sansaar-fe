import LayoutSlice from './slice';
import get from 'lodash/get';

const selectors = {
  selectMainPaneWidth: (state) => get(state, `${LayoutSlice.name}.mainPaneWidth`)
}

export const { setMainPaneWidth } = LayoutSlice.actions;

export { LayoutSlice, selectors }