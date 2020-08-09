import AuthSlice from './slice';
import UserSlice from './UserSlice';
import * as selectors from './selectors';

export const { startAuthRequest, authFailure, authSuccess, fetchedDatafromSlice } = AuthSlice.actions;
// export const { startFetchRequest, fetchFailure, fetchSuccess} = UserSlice.actions;

export { AuthSlice, selectors, UserSlice };
