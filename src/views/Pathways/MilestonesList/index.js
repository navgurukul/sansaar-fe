import React, { useEffect, Fragment } from "react"
import { Typography, withTheme } from "@material-ui/core"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { compose } from "recompose"
import { withRouter } from 'react-router';
import Button from "@material-ui/core/Button"
import TableOrCardList from "../../../components/TableOrCardList"
import { ngFetch } from "../../../providers/NGFetch"
import tableColumns from "./table"
import MilestoneCard from "../components/MilestoneCard"
import history from "../../../providers/routing/app-history"
import Spacer from "../../../components/Spacer"
import {
  selectors as layoutSelectors,
  setMainPaneScrollToTopPending,
} from "../../../layouts/TwoColumn/store"
import { setAllMilestones, selectors as userSelectors } from "../store";

function MilestonesList({
  match,
  mainPaneWidth,
  actions,
  allMilestones,
  theme,
}) {
  const { pathwayId } = match.params
  useEffect(() => {
    const fetchData = async () => {
      const response = await ngFetch(`/pathways/${pathwayId}/milestones`, {
        method: "GET",
      })
      actions.setAllMilestones(response.milestones)
    }
    fetchData()
  }, [actions,pathwayId],match.path)

  const MileStoneCard = (Milestone, key) => (
    <MilestoneCard
      key={key}
      id={Milestone.id}
      name={Milestone.name}
      startedAt={Milestone.createdAt}
      description={Milestone.description}
    />
  )

  const milestones = React.useMemo(() => Object.values(allMilestones), [
    allMilestones,
  ])

  const handleRowClick = milestoneId => {
    history.push(`/pathways/${pathwayId}/milestones/${milestoneId}`)
  }

  const handleAddMilestone = () => {
    history.push(`/pathways/${pathwayId}/milestones/add`)
  }

  return (
    <Fragment>
      <Typography variant="h3">Milestones</Typography>
      <Spacer height={theme.spacing(2)} />
      <Button variant="contained" color="primary" onClick={handleAddMilestone}>
        Add Milestone
      </Button>
      <Spacer height={theme.spacing(2)} />
      <TableOrCardList
        tableColumns={tableColumns}
        data={milestones}
        containerWidth={mainPaneWidth}
        renderCard={MileStoneCard}
        onRowClick={handleRowClick}
        scrollContainerToTop={() => actions.setMainPaneScrollToTopPending(true)}
      />
    </Fragment>
  )
}

const mapStateToProps = state => ({
  mainPaneWidth: layoutSelectors.selectMainPaneWidth(state),
  allMilestones: userSelectors.selectAllMilestones(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { setAllMilestones, setMainPaneScrollToTopPending },
    dispatch
  ),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTheme,
  withRouter,
)(MilestonesList)