import AuthSlice from './slice';
import UserSlice from './UserSlice';
import * as selectors from './selectors';

const logOutAction = () => ({type: 'USER_LOGOUT'});

export const { startAuthRequest, authFailure, authSuccess, fetchedDatafromSlice } = AuthSlice.actions;

export { AuthSlice, selectors, logOutAction, UserSlice };