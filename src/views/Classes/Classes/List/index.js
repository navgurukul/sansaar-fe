import React, { useEffect } from "react"
import { withTheme,Typography } from "@material-ui/core"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { compose } from "recompose"
import { withRouter } from "react-router"
import TableOrCardList from "../../../../components/TableOrCardList"
import { ngFetch } from "../../../../providers/NGFetch"
import tableColumns from "./table"
import history from "../../../../providers/routing/app-history"
import {
  selectors as layoutSelectors,
  setMainPaneScrollToTopPending,
  setMainPaneLoading,
} from "../../../../layouts/TwoColumn/store"
import { setAllUpcomingClasses, selectors as classesSelectors } from "../store"
import MainPaneWithTitle from "../../../../components/MainPaneWithTitle";
import Spacer from "../../../../components/Spacer";

function ClassesList({
  match,
  mainPaneWidth,
  actions,
  allUpcomingClasses,
  mainPaneLoading,
  theme,
}) {
  useEffect(
    () => {
      const fetchData = async () => {
        actions.setMainPaneLoading(true)
        const response = await ngFetch(`/classes/upcoming`, {
          method: "GET",
        })
        console.log(response, "response of classes")
        actions.setAllUpcomingClasses(response.classes)
        actions.setMainPaneLoading(false)
      }
      fetchData()
    },
    [actions],
    match.path
  )

    const upcomingClasses = React.useMemo(() => Object.values(allUpcomingClasses), [
      allUpcomingClasses,
    ])

    const handleRowClick = classId => {
      history.push(`/classes/${classId}`)
    }

  return    ( 
    <MainPaneWithTitle
      addBtnLink="/classes/add"
      title="Classes"
    >
      <Typography variant="h4">Upcoming Classes</Typography>
      <Spacer height={theme.spacing(2)} />
      <TableOrCardList
        loading={mainPaneLoading}
        tableColumns={tableColumns}
        data={upcomingClasses}
        containerWidth={mainPaneWidth}
        onRowClick={handleRowClick}
        scrollContainerToTop={() => actions.setMainPaneScrollToTopPending(true)}
        cardTitle="title"
      />
    </MainPaneWithTitle>
)
}

const mapStateToProps = state => ({
  mainPaneWidth: layoutSelectors.selectMainPaneWidth(state),
  allUpcomingClasses: classesSelectors.selectAllUpcomingClasses(state),
  mainPaneLoading: layoutSelectors.selectMainPaneLoading(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setAllUpcomingClasses,
      setMainPaneScrollToTopPending,
      setMainPaneLoading,
    },
    dispatch
  ),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTheme,
  withRouter
)(ClassesList)
