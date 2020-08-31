import React, { useEffect } from "react"
import {  withTheme } from "@material-ui/core"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { compose } from "recompose"
import { withRouter } from 'react-router';
import TableOrCardList from "../../../../components/TableOrCardList"
import { ngFetch } from "../../../../providers/NGFetch";
import tableColumns from "./table"
import history from "../../../../providers/routing/app-history"
import {
  selectors as layoutSelectors,
  setMainPaneScrollToTopPending,
  setMainPaneLoading,
} from "../../../../layouts/TwoColumn/store"
import { setAllCourses, selectors as userSelectors } from "../../store";
import MainPaneWithTitle from '../../../../components/MainPaneWithTitle';

function CoursesList({
  match,
  mainPaneWidth,
  actions,
  allCourses,
  mainPaneLoading,
}) {
  const { pathwayId } = match.params
  useEffect(() => {
    const fetchData = async () => {
      actions.setMainPaneLoading(true);
      const response = await ngFetch(`/pathways/${pathwayId}/courses`, {
        method: "GET",
      })
      actions.setAllCourses(response)
      actions.setMainPaneLoading(false);
    }
    fetchData()
  }, [actions,pathwayId],match.path)


  const courses = React.useMemo(() => Object.values(allCourses), [
    allCourses,
  ])

  const handleRowClick = pathwayCourseId => {
    history.push(`/pathways/${pathwayId}/courses/${pathwayCourseId}/edit`)
  }


  return (
    
    <MainPaneWithTitle addBtnLink={`/pathways/${pathwayId}/courses/add`} title='Courses'>
      <TableOrCardList
        loading={mainPaneLoading}
        tableColumns={tableColumns}
        data={courses}
        containerWidth={mainPaneWidth}
        onRowClick={handleRowClick}
        scrollContainerToTop={() => actions.setMainPaneScrollToTopPending(true)}
        cardTitle='name'
      />
    </MainPaneWithTitle>

    
  )
}

const mapStateToProps = state => ({
  mainPaneWidth: layoutSelectors.selectMainPaneWidth(state),
  allCourses: userSelectors.selectAllCourses(state),
  mainPaneLoading: layoutSelectors.selectMainPaneLoading(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { setAllCourses, setMainPaneScrollToTopPending,setMainPaneLoading },
    dispatch
  ),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTheme,
  withRouter,
)(CoursesList)