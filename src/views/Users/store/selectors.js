import get from 'lodash/get';
import UserSectionSlice from './slice';

export const selectUserToView = (state) => get(state, `${UserSectionSlice.name}.userToView`);
export const selectAllUsers = (state) => get(state, `${UserSectionSlice.name}.allUsers`);
export const selectAllMentees = (state) => get(state, `${UserSectionSlice.name}.allMentees`);
export const selectPathwayMenteesToView = (state) => get(state, `${UserSectionSlice.name}.PathwayMenteesToView`);