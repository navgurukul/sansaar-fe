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
    courseToView: null,
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
    setCourseToView: (state, action) => {
      state.courseToView = action.payload
    },
    addOrEditMilestone: (state, {payload : {milestone, milestoneId}}) => {
        state.allMilestones[milestoneId] = milestone
    },
    addOrEditPathway: (state, {payload : {pathway, pathwayId}}) => {
        state.allPathways[pathwayId] = pathway
    },
    addOrEditCourse: (state, {payload : {pathwaysCourse, pathwaysCourseId}}) => {
      state.allCourses[pathwaysCourseId] = pathwaysCourse
  }
  },
});

export default PathwaySectionSlice;