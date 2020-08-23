import get from 'lodash/get';
import ProgressSectionSlice from './slice';

export const selectAllParameters = (state) => get(state, `${ProgressSectionSlice.name}.allParameters`);
export const selectParameterToView = (state) => get(state, `${ProgressSectionSlice.name}.parameterToView`);
export const selectAllQuestions = (state) => get(state, `${ProgressSectionSlice.name}.allQuestions`);
export const selectQuestionToView = (state) => get(state, `${ProgressSectionSlice.name}.questionToView`);