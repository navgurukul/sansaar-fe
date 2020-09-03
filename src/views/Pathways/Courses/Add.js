import React, { useEffect } from "react"
import { useSnackbar } from "notistack"
import { withRouter } from "react-router"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { compose } from "recompose"
import { pullAllBy } from "lodash"
import { selectors as userSelectors,addOrEditCourse } from "../store"
import {
  selectors as layoutSelectors,
  setRightPaneLoading,
} from "../../../layouts/TwoColumn/store"
import FormBuilder from "../../../components/FormBuilder"
import history from "../../../providers/routing/app-history"
import { getCourseAddFormStructure } from "./form"
import { ngFetch } from "../../../providers/NGFetch"

const CourseAdd = ({ actions, pathwayId,allCourses }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false)
  const [coursesNeedToShow, setCoursesNeedToShow] = React.useState(null)
  useEffect(() => {
    const fetchAllCourses = async () => {
      const courses = await ngFetch(`/courses`)
      const pathwayCourses = await ngFetch(`/pathways/${pathwayId}/courses`)
      setCoursesNeedToShow(
        pullAllBy(courses.availableCourses, pathwayCourses, "name")
      )
    }
    fetchAllCourses()
  }, [actions, pathwayId,allCourses])

  const onSubmit = async data => {
    setSubmitBtnDisabled(true)
    const response = await ngFetch(`/pathways/${pathwayId}/courses`, {
      method: "POST",
      body: data,
    })
    actions.addOrEditCourse({
      pathwaysCourse: response.pathwayCourse,
      pathwaysCourseId: response.pathwayCourse.id,
    })
    enqueueSnackbar("Course created.", { variant: "success" })
    setSubmitBtnDisabled(false)
    history.push(`/pathways/${pathwayId}/`)
  }

  const course = ""
  return (
    <FormBuilder
      structure={getCourseAddFormStructure(course, coursesNeedToShow)}
      onSubmit={onSubmit}
      submitBtnDisabled={submitBtnDisabled}
    />
  )
}

const mapStateToProps = state => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
  allCourses: userSelectors.selectAllCourses(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { addOrEditCourse, setRightPaneLoading },
    dispatch
  ),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(CourseAdd)
