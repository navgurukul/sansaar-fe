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
    setUserPathwaysList: (state, { payload: { pathways } }) => {
      state.userToView.pathways = pathways;
    },
    setAllMentees: (state, action) => {
      state.allMentees = fromPairs( action.payload.map(u => [u.id, u]) );
    },
    setUserMenteesList: (state, action) => {
      state.allMentees = fromPairs( action.payload.map(u => [u.id, u]) );
    },

  },
});

export default UserSectionSlice;