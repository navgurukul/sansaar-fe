import { createSlice } from '@reduxjs/toolkit';
import fromPairs from 'lodash/fromPairs';

const PathwaySectionSlice = createSlice({
  name: 'PathwaySection',
  initialState: {
    pathwayToView:null,
    allPathways: {},
    milestoneToView: null,
    allMilestones:{},
    allCourses: {},
  },
  reducers: {
    setAllPathways: (state, action) => {
      state.allPathways = fromPairs( action.payload.map(u => [u.id, u]) );
    },
    setAllMilestones: (state, action) => {
      state.allMilestones = fromPairs( action.payload.map(u => [u.id, u]) );
    },
    setAllCourses: (state, action) => {
      state.allCourses = fromPairs( action.payload.map(u => [u.id, u]) );
    },
    setPathwayToView: (state, action) => {
      state.pathwayToView = action.payload
    },
    setMilestoneToView: (state, action) => {
      state.milestoneToView = action.payload
    },
    addOrEditMilestone: (state, {payload : {milestone, milestoneId}}) => {
        state.allMilestones[milestoneId] = milestone
    },
    addOrEditPathway: (state, {payload : {pathway, pathwayId}}) => {
        state.allPathways[pathwayId] = pathway
    },
    addOrEditCourse: (state, {payload : {course, courseId}}) => {
      state.allCourses[courseId] = course
  }
  },
});

export default PathwaySectionSlice;