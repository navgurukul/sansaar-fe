import PathwaySectionSlice from './slice';
import * as selectors from './selectors';

export const { setPathwayToView, setMilestoneToView, setAllPathways, setAllMilestones, setAddOrEditPathway, setAddOrEditMilestone } = PathwaySectionSlice.actions;

export { PathwaySectionSlice, selectors }