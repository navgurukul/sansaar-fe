import ClassesSectionSlice from "./slice"
import * as selectors from "./selectors"

export const {
  setAllUpcomingClasses,
  setClassToView,
} = ClassesSectionSlice.actions

export { ClassesSectionSlice, selectors }
