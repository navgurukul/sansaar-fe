import PathwaySectionSlice from './slice';
import * as selectors from './selectors';

export const { setPathwayToView, setMilestoneToView, setAllPathways, setAllMilestones, addOrEditPathway, addOrEditMilestone } = PathwaySectionSlice.actions;

export { PathwaySectionSlice, selectors }