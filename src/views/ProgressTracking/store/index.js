import ProgressSectionSlice from "./slice"
import * as selectors from "./selectors"

export const {
  setAllParameters,
  setParameterToView,
  addOrEditParameter,
  setAllQuestions,
  setQuestionToView,
  addOrEditQuestion,
} = ProgressSectionSlice.actions

export { ProgressSectionSlice, selectors }
