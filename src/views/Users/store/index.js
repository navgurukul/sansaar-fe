import UserSectionSlice from './slice';
import * as selectors from './selectors';

export const { setUserToView, setAllUsers, setUserRolesList,setUserPathwaysList,setAllMentees,setUserPathwayToView,setUserMenteesList } = UserSectionSlice.actions;

export { UserSectionSlice, selectors }