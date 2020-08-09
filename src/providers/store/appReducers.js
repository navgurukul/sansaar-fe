import { combineReducers } from 'redux';

import { AuthSlice } from '../../auth';
import { LayoutSlice } from '../../layouts/TwoColumn/store'

export default combineReducers({
  [AuthSlice.name]: AuthSlice.reducer,
  [LayoutSlice.name]: LayoutSlice.reducer,
});
