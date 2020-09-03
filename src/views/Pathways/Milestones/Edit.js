import React, { useEffect } from "react"
import { bindActionCreators } from "redux"
import { withRouter } from "react-router"
import { compose } from "recompose"
import { connect } from "react-redux"
import { useSnackbar } from "notistack"
import { withTheme } from "@material-ui/core"
import { selectors, setMilestoneToView, addOrEditMilestone } from "../store"
import {
  selectors as layoutSelectors,
  setRightPaneLoading,
} from "../../../layouts/TwoColumn/store"
import { ngFetch } from "../../../providers/NGFetch"
import { getMilestoneEditFormStructure } from "./form"
import FormBuilder from "../../../components/FormBuilder"
import Spacer from "../../../components/Spacer"
import RightPaneWithTitle from "../../../components/RightPaneWithTitle"
import history from "../../../providers/routing/app-history"

const MilestoneEdit = ({ rightPaneLoading, actions, match, theme }) => {
  const { milestoneId, pathwayId } = match.params
  const { enqueueSnackbar } = useSnackbar()

  const [milestone, setMilestone] = React.useState(null)
  const [allMilestones, setAllMilestones] = React.useState(null)
  useEffect(() => {
    const fetchData = async () => {
      actions.setRightPaneLoading(true)
      const responseOfMilestoneOpened = await ngFetch(
        `/pathways/${pathwayId}/milestones/${milestoneId}`
      )
      actions.setMilestoneToView(responseOfMilestoneOpened.milestone)
      setMilestone(responseOfMilestoneOpened.milestone)
      const responseOfPathwayMistones = await ngFetch(
        `/pathways/${pathwayId}/milestones`
      )
      setAllMilestones(responseOfPathwayMistones.milestones)
      actions.setRightPaneLoading(false)
    }
    fetchData()
  }, [milestoneId, pathwayId, actions])

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false)
  const onSubmit = async data => {
    setSubmitBtnDisabled(true)
    delete data.createdAt
    const response = await ngFetch(
      `/pathways/${pathwayId}/milestones/${milestoneId}`,
      {
        method: "PUT",
        body: data,
      }
    )
    actions.addOrEditMilestone({
      milestone: response.milestone[0],
      milestoneId: response.milestone[0].id,
    })
    setMilestone(response.milestone)
    enqueueSnackbar("Milestone details saved.", { variant: "success" })
    setSubmitBtnDisabled(false)
    history.push(`/pathways/${pathwayId}/milestones/`)
  }

  if (!milestone || rightPaneLoading) {
    return <React.Fragment />
  }

  return (
    <RightPaneWithTitle
      title="Edit Milestone"
      closeLink={`/pathways/${pathwayId}/milestones`}
    >
      <FormBuilder
        structure={getMilestoneEditFormStructure(milestone, allMilestones)}
        onSubmit={onSubmit}
        initialValues={milestone}
        submitBtnDisabled={submitBtnDisabled}
      />
      <Spacer height={theme.spacing(2)} />
    </RightPaneWithTitle>
  )
}

const mapStateToProps = state => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
  milestone: selectors.selectMilestoneToView(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { setRightPaneLoading, setMilestoneToView, addOrEditMilestone },
    dispatch
  ),
})

export default compose(
  withTheme,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MilestoneEdit)
