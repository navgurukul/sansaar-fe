import { createSlice } from '@reduxjs/toolkit';
import fromPairs from 'lodash/fromPairs';

const ProgressSectionSlice = createSlice({
  name: 'progressSection',
  initialState: {
    parameterToView: null,
    allParameters: {},
    allQuestions:{},
    questionToView:null,
  },
  reducers: {
    setAllParameters: (state, action) => {
      state.allParameters = fromPairs( action.payload.map(u => [u.id, u]) );
    },
    setParameterToView: (state, action) => {
      state.parameterToView = action.payload
    },
    addOrEditParameter: (state, {payload : {parameter, parameterId}}) => {
      state.allParameters[parameterId] = {...parameter,id:parameterId}
  },
  setAllQuestions: (state, action) => {
    state.allQuestions = fromPairs( action.payload.map(u => [u.id, u]) );
  },
  setQuestionToView: (state, action) => {
    state.questionToView = action.payload
  },
  addOrEditQuestion: (state, {payload : {question, questionId}}) => {
    state.allQuestions[questionId] = {...question,id:questionId}
},
  },
});

export default ProgressSectionSlice;