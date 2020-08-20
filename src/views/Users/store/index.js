import UserSectionSlice from './slice';
import * as selectors from './selectors';

export const { setUserToView, setAllUsers, setUserRolesList,setUserPathwaysList } = UserSectionSlice.actions;

export { UserSectionSlice, selectors }