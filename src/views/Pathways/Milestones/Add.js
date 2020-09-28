import React, { useEffect } from "react"
import { useSnackbar } from "notistack"
import { withRouter } from "react-router"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { compose } from "recompose"
import {Container} from '@material-ui/core'
import { addOrEditMilestone } from "../store"
import {
  selectors as layoutSelectors,
  setRightPaneLoading,
} from "../../../layouts/TwoColumn/store"
import RightPaneWithTitle from "../../../components/RightPaneWithTitle"
import FormBuilder from "../../../components/FormBuilder"
import history from "../../../providers/routing/app-history"
import { getMilestoneAddFormStructure } from "./form"
import { ngFetch } from "../../../providers/NGFetch"

const MilestoneAdd = ({ actions, match }) => {
  const { pathwayId } = match.params
  const { enqueueSnackbar } = useSnackbar()

  const [allMilestones, setAllMilestones] = React.useState(null)
  useEffect(() => {
    const fetchAllMilestones = async () => {
      actions.setRightPaneLoading(true)
      const response = await ngFetch(`/pathways/${pathwayId}/milestones`)
      setAllMilestones(response.milestones)
      actions.setRightPaneLoading(false)
    }
    fetchAllMilestones()
  }, [actions, pathwayId])

  const milestone = ""
  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false)

  const onSubmit = async data => {
    data.position = data.position === "" ? 0 : (data.position += 1)
    setSubmitBtnDisabled(true)
    const response = await ngFetch(`/pathways/${pathwayId}/milestones`, {
      method: "POST",
      body: data,
    })
    actions.addOrEditMilestone({
      milestone: response.pathway[0],
      milestoneId: response.pathway[0].id,
    })
    enqueueSnackbar("Milestone created.", { variant: "success" })
    setSubmitBtnDisabled(false)
    history.push(`/pathways/${pathwayId}/milestones`)
  }

  return (
    <Container>
      <RightPaneWithTitle
        title="Add Milestone"
        closeLink={`/pathways/${pathwayId}/milestones`}
      >
        <FormBuilder
          structure={getMilestoneAddFormStructure(milestone, allMilestones)}
          onSubmit={onSubmit}
          submitBtnDisabled={submitBtnDisabled}
        />
      </RightPaneWithTitle>
    </Container>
  )
}

const mapStateToProps = state => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { addOrEditMilestone, setRightPaneLoading },
    dispatch
  ),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(MilestoneAdd)
