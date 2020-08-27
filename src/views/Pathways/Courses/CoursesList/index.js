import React, { useEffect } from "react"
import {  withTheme } from "@material-ui/core"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { compose } from "recompose"
import { withRouter } from 'react-router';
import TableOrCardList from "../../../../components/TableOrCardList"
import RenderCards from "../../../../components/TableOrCardList/RenderCards";
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
}) {
  const { pathwayId } = match.params
  useEffect(() => {
    const fetchData = async () => {
      actions.setMainPaneLoading(true);
      const response = await ngFetch(`/courses/pathway/${pathwayId}`, {
        method: "GET",
      })
      console.log(response, 'nayaknayak')
      actions.setAllCourses(response)
      actions.setMainPaneLoading(false);
    }
    fetchData()
  }, [actions,pathwayId],match.path)

  const CoursesCard = (row, key) => (
    <RenderCards row={row} key={key} titleKey={row.id} tableColumns={tableColumns} />
  )

  const courses = React.useMemo(() => Object.values(allCourses), [
    allCourses,
  ])

  // const handleRowClick = milestoneId => {
  //   history.push(`/courses/pathways/${pathwayId}/edit`)
  // }


  return (
    
    <MainPaneWithTitle addBtnLink={`/courses/pathways/${pathwayId}/add`} title='Courses'>
      <TableOrCardList
        tableColumns={tableColumns}
        data={courses}
        containerWidth={mainPaneWidth}
        renderCard={CoursesCard}
        // onRowClick={handleRowClick}
        scrollContainerToTop={() => actions.setMainPaneScrollToTopPending(true)}
      />
    </MainPaneWithTitle>

    
  )
}

const mapStateToProps = state => ({
  mainPaneWidth: layoutSelectors.selectMainPaneWidth(state),
  allCourses: userSelectors.selectAllCourses(state),
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