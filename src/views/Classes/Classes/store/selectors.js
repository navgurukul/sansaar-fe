import get from 'lodash/get';
import ClassesSectionSlice from './slice';

export const selectAllUpcomingClasses = (state) => get(state, `${ClassesSectionSlice.name}.allUpcomingClasses`);
export const selectClassToView = (state) => get(state, `${ClassesSectionSlice.name}.classToView`);