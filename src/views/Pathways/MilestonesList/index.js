import React, { useEffect } from "react"
import {  withTheme } from "@material-ui/core"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { compose } from "recompose"
import { withRouter } from 'react-router';
import TableOrCardList from "../../../components/TableOrCardList"
import RenderCards from "../../../components/TableOrCardList/RenderCards";
import { ngFetch } from "../../../providers/NGFetch";
import tableColumns from "./table"
import history from "../../../providers/routing/app-history"
import {
  selectors as layoutSelectors,
  setMainPaneScrollToTopPending,
} from "../../../layouts/TwoColumn/store"
import { setAllMilestones, selectors as userSelectors } from "../store";
import MainPaneWithTitle from '../../../components/MainPaneWithTitle';

function MilestonesList({
  match,
  mainPaneWidth,
  actions,
  allMilestones,
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

  const MileStoneCard = (row, key) => (
    <RenderCards row={row} key={key} titleKey={row.id} tableColumns={tableColumns} />
  )

  const milestones = React.useMemo(() => Object.values(allMilestones), [
    allMilestones,
  ])

  const handleRowClick = milestoneId => {
    history.push(`/pathways/${pathwayId}/milestones/${milestoneId}`)
  }


  return (
    <MainPaneWithTitle addBtnLink={`/pathways/${pathwayId}/milestones/add`} title='Milestones'>
      <TableOrCardList
        tableColumns={tableColumns}
        data={milestones}
        containerWidth={mainPaneWidth}
        renderCard={MileStoneCard}
        onRowClick={handleRowClick}
        scrollContainerToTop={() => actions.setMainPaneScrollToTopPending(true)}
      />
    </MainPaneWithTitle>
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