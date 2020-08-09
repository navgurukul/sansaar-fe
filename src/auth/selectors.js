import { createSelector } from 'reselect';
import get from 'lodash/get';

import AuthSlice from './slice';
// import UserSlice from './UserSlice';

export const selectAuthToken = (state) => get(state, `${AuthSlice.name}.token`);
export const selectAuthPending = (state) => get(state, `${AuthSlice.name}.pending`);
export const selectAuthError = (state) => get(state, `${AuthSlice.name}.error`);
export const selectUser = (state) => get(state, `${AuthSlice.name}.user`);

export const selectIsAuthorized = createSelector(
  selectAuthToken,
  (authToken) => authToken !== null,
);

// export const selectFetchedData = (state) => get(state, `${AuthSlice.name}.data`);
// export const selectFetchPending = (state) => get(state, `${UserSlice.name}.pending`);
// export const selectFetchError = (state) => get(state, `${UserSlice.name}.error`);

