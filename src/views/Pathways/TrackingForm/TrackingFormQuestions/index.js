import React from "react"
import {Typogarphy } from '@material-ui/core'
import CustomCard from '../../../../components/TableOrCardList/CustomCard'
import TrackingFormQuestionAdd from './Add'

const TrackingFormQuestions = ({questions,pathwayId}) => {

  return (
    <div>
      <h1>Trackingform Questions</h1>
      {questions && questions.questions.length ? <CustomCard data={questions.questions} keys={['name','description']} /> : <h5>Questions are not ther</h5> }
      <TrackingFormQuestionAdd pathwayId={pathwayId} />
    </div>
  )
}

export default TrackingFormQuestions
