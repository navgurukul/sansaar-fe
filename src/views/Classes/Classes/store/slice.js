import { createSlice } from '@reduxjs/toolkit';
import fromPairs from 'lodash/fromPairs';

const ClassesSectionSlice = createSlice({
  name: 'ClassesSection',
  initialState: {
    classToView:null,
    allUpcomingClasses: {},
  },
  reducers: {
    setAllUpcomingClasses: (state, action) => {
      state.allUpcomingClasses = fromPairs( action.payload.map(u => [u.id, u]) );
    },
    setClassToView: (state, action) => {
      state.classToView = action.payload
    },


  },
});

export default ClassesSectionSlice;