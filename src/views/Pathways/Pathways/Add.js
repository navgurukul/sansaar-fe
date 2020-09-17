import React from "react"
import { useSnackbar } from "notistack"
import { compose } from "recompose"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { addOrEditPathway } from "../store"
import RightPaneWithTitle from "../../../components/RightPaneWithTitle"
import FormBuilder from "../../../components/FormBuilder"
import history from "../../../providers/routing/app-history"
import { getPathwayAddFormStructure } from "./form"
import { ngFetch } from "../../../providers/NGFetch"

const PathwayAdd = ({ actions }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [trackingEnabled, setTrackingEnabled] = React.useState(null)

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false)

  const onSubmit = async data => {
    // console.log(data, 'data going to submit')
    data.tracking_day_of_week= parseInt(data.tracking_day_of_week, 10)
    data.tracking_days_lock_before_cycle= parseInt(data.tracking_days_lock_before_cycle, 10)
    data.tracking_enabled = data.tracking_enabled === "true"
    // console.log(data, 'data after changing')
    setSubmitBtnDisabled(true)
    const response = await ngFetch("/pathways", { method: "POST", body: data })
    const pathwayId = response.pathway.id
    actions.addOrEditPathway({
      pathway: response.pathway,
      pathwayId: response.pathway.id,
    })
    enqueueSnackbar("Pathway created.", { variant: "success" })
    setSubmitBtnDisabled(false)
    history.push(`/pathways/${pathwayId}`)
  }

  const selectedTrackingEnabled = v => {
    setTrackingEnabled(v)
  }

  const fieldsToWatch = {
    tracking_enabled: selectedTrackingEnabled,
  }
  const pathway = ""
  return (
    <RightPaneWithTitle title="Add Pathway" closeLink="/pathways">
      <FormBuilder
        structure={getPathwayAddFormStructure(pathway, trackingEnabled)}
        onSubmit={onSubmit}
        submitBtnDisabled={submitBtnDisabled}
        fieldsToWatch={fieldsToWatch}
      />
    </RightPaneWithTitle>
  )
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addOrEditPathway }, dispatch),
})

export default compose(connect(null, mapDispatchToProps))(PathwayAdd)
