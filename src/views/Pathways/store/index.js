import PathwaySectionSlice from './slice';
import * as selectors from './selectors';

export const { setPathwayToView, setMilestoneToView, setAllPathways, setAllMilestones, addOrEditPathway,addOrEditCourse, addOrEditMilestone, setAllCourses } = PathwaySectionSlice.actions;

export { PathwaySectionSlice, selectors }