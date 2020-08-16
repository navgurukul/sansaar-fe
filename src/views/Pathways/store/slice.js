import { createSlice } from '@reduxjs/toolkit';
import fromPairs from 'lodash/fromPairs';

const PathwaySectionSlice = createSlice({
  name: 'PathwaySection',
  initialState: {
    pathwayToView:null,
    allPathways: {},
    milestoneToView: null,
    allMilestones:{},
  },
  reducers: {
    setAllPathways: (state, action) => {
      state.allPathways = fromPairs( action.payload.map(u => [u.id, u]) );
    },
    setAllMilestones: (state, action) => {
      state.allMilestones = fromPairs( action.payload.map(u => [u.id, u]) );
    },
    setPathwayToView: (state, action) => {
      state.pathwayToView = action.payload
    },
    setMilestoneToView: (state, action) => {
      state.milestoneToView = action.payload
    },
    setAddOrEditMilestone: (state, {payload : {milestone, milestoneId}}) => {
      if(!state.allMilestones[milestoneId]){
        state.allMilestones[milestoneId] = milestone
      }
      else{
        state.allMilestones[milestoneId] = milestone
      }
    },
    setAddOrEditPathway: (state, {payload : {pathway, pathwayId}}) => {
      if(!state.allPathways[pathwayId]){
        state.allPathways[pathwayId] = pathway
      }
      else{
        state.allPathways[pathwayId] = pathway
      }
    }
  },
});

export default PathwaySectionSlice;