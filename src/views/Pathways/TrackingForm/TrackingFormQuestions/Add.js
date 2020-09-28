import React, { useEffect } from "react"
import { useSnackbar } from "notistack"
import { withRouter } from "react-router"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { compose } from "recompose"
import { pullAllBy } from "lodash"
import { selectors as pathwaySelectors,addOrEditTrackingForm } from "../../store"
import {
  selectors as layoutSelectors,
  setRightPaneLoading,
} from "../../../../layouts/TwoColumn/store"
import FormBuilder from "../../../../components/FormBuilder"
import history from "../../../../providers/routing/app-history"
import { getTrackingFormQuestionAddFormStructure } from "./form"
import { ngFetch } from "../../../../providers/NGFetch"

const TrackingFormQuestionAdd = ({ actions, pathwayId,trackingForm }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false)
  const [questionssNeedToShow, setQuestionsNeedToShow] = React.useState(null)
  useEffect(() => {
    const fetchAllQuestions = async () => {
      const questions = await ngFetch(`/progressTracking/questions`)
    //   console.log(questions.questions,'courses.availableCourses')
      const trackingFormData = await ngFetch(`/pathways/${pathwayId}/trackingForm`)
    //   console.log(trackingFormData.form.questions,'trackingFormQuestions.questions')
      setQuestionsNeedToShow(
        pullAllBy(questions.questions, trackingFormData.form.questions, "id")
      )
    }
    fetchAllQuestions()
  }, [actions, pathwayId,trackingForm])

  const onSubmit = async data => {
    setSubmitBtnDisabled(true)
    // const trackingFormData = await ngFetch(`/pathways/${pathwayId}/trackingForm`)
    const idsOfQuesAndParams = {"questionIds":[parseInt(data.questionIds,10)], "paramIds": []}
    const response = await ngFetch(`/pathways/${pathwayId}/trackingForm`, {
      method: "PUT",
      body: idsOfQuesAndParams,
    })
    actions.addOrEditTrackingForm({
        trackingForm :response.form
    })
    enqueueSnackbar("TrackingForm  Question created.", { variant: "success" })
    setSubmitBtnDisabled(false)
    history.push(`/pathways/${pathwayId}/`)
  }

  const question = ""
  return (
    <FormBuilder
      structure={getTrackingFormQuestionAddFormStructure(question, questionssNeedToShow)}
      onSubmit={onSubmit}
      submitBtnDisabled={submitBtnDisabled}
    />
  )
}

const mapStateToProps = state => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
  trackingForm: pathwaySelectors.selectTrackingForm(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { addOrEditTrackingForm, setRightPaneLoading },
    dispatch
  ),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(TrackingFormQuestionAdd)
