import AuthSlice from './slice';
import * as selectors from './selectors';

const logOutAction = () => ({type: 'USER_LOGOUT'});

export const { startAuthRequest, authFailure, authSuccess } = AuthSlice.actions;

export { AuthSlice, selectors, logOutAction };
