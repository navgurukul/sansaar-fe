import ProgressSectionSlice from './slice';
import * as selectors from './selectors';

export const { setAllParameters,setParameterToView, addOrEditParameter } = ProgressSectionSlice.actions;

export { ProgressSectionSlice, selectors }