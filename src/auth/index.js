import AuthSlice from './slice';
import * as selectors from './selectors';

const logOutAction = () => ({type: 'USER_LOGOUT'});

export const { startAuthRequest, authFailure, authSuccess, fetchedDatafromSlice } = AuthSlice.actions;

export { AuthSlice, selectors, logOutAction };