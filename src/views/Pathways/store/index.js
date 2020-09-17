import PathwaySectionSlice from "./slice"
import * as selectors from "./selectors"

export const {
  setPathwayToView,
  setMilestoneToView,
  setCourseToView,
  setAllPathways,
  setAllMilestones,
  addOrEditPathway,
  addOrRearrangeCourse,
  addOrEditMilestone,
  setAllCourses,
  addOrEditTrackingForm,
} = PathwaySectionSlice.actions

export { PathwaySectionSlice, selectors }
