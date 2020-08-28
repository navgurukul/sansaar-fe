import get from 'lodash/get';
import PathwaysSectionSlice from './slice';

export const selectAllPathways = (state) => get(state, `${PathwaysSectionSlice.name}.allPathways`);
export const selectAllMilestones = (state) => get(state, `${PathwaysSectionSlice.name}.allMilestones`);
export const selectAllCourses = (state) => get(state, `${PathwaysSectionSlice.name}.allCourses`);
export const selectPathwayToView = (state) => get(state, `${PathwaysSectionSlice.name}.pathwayToView`);
export const selectMilestoneToView = (state) => get(state, `${PathwaysSectionSlice.name}.milestoneToView`);
export const selectCourseToView = (state) => get(state, `${PathwaysSectionSlice.name}.courseToView`);