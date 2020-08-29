import { createSlice } from '@reduxjs/toolkit';
import fromPairs from 'lodash/fromPairs';

const UserSectionSlice = createSlice({
  name: 'userSection',
  initialState: {
    userToView: null,
    allUsers: {},
    allMentees: {},
    PathwayMenteesToView:{},
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = fromPairs( action.payload.map(u => [u.id, u]) );
    },
    setUserToView: (state, action) => {
      state.userToView = action.payload
    },
    setUserRolesList: (state, { payload: { rolesList, userId } }) => {
      state.userToView.rolesList = rolesList;
      if (state.allUsers[userId]) {
        state.allUsers[userId].rolesList = rolesList;
      }
    },
    setUserPathwaysList: (state, { payload: { pathways, userId } }) => {
      state.userToView.pathways = pathways;
      if (state.allUsers[userId]) {
        state.allUsers[userId].pathways = pathways;
      }
    },
    setAllMentees: (state, action) => {
      state.allMentees = fromPairs( action.payload.map(u => [u.id, u]) );
    },
    setUserMenteesList: (state, {payload: {mentees, userId}}) => {
      state.allMentees = fromPairs( mentees.map(u => [u.id, u]) );
      if (state.allUsers[userId]) {
        state.allUsers[userId].mentees = mentees;
      }
    },

  },
});

export default UserSectionSlice;