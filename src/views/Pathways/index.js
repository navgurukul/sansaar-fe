import React from "react"
import TwoColumnLayout from "../../layouts/TwoColumn"
import PathwaysList from "./Pathways/List"
import PathwayEdit from "./Pathways/Edit"
import PathwayAdd from "./Pathways/Add"
import MilestonesList from "./Milestones/List"
import MilestoneEdit from "./Milestones/Edit"
import MilestoneAdd from "./Milestones/Add"
import CoursesList from "./Courses/List"
import MentorshipTree from "./MentorshipTree"
import CourseAdd from "./Courses/Add"

const PathwaysSection = () => {
  const mainPaneRoutes = [
    {
      path: "/pathways/:pathwayId/courses",
      exact: false,
      component: CoursesList,
      key: "COURSES_LIST",
    },
    {
      path: "/pathways/:pathwayId/milestones",
      exact: false,
      component: MilestonesList,
      key: "MILESTONES_LIST",
    },
    {
      path: "/pathways/:pathwayId/mentorTree",
      auth: true,
      key: "MENTORSHIP_TREE_SECTION",
      component: MentorshipTree,
    },
    {
      path: "/pathways",
      exact: false,
      component: PathwaysList,
      key: "PATHWAYS_LIST",
    },
  ]
  const rightPaneRoutes = [
    {
      path: "/pathways/add",
      exact: true,
      component: PathwayAdd,
      key: "PATHWAY_ADD",
    },
    {
      path: "/pathways/:pathwayId",
      exact: true,
      component: PathwayEdit,
      key: "PATHWAY_EDIT",
    },
    {
      path: "/pathways/:pathwayId/milestones/add",
      exact: true,
      component: MilestoneAdd,
      key: "MILESTONE_ADD",
    },
    {
      path: "/pathways/:pathwayId/milestones/:milestoneId",
      exact: true,
      component: MilestoneEdit,
      key: "MILESTONE_ADD",
    },
    {
      path: "/pathways/:pathwayId/courses/add",
      exact: true,
      component: CourseAdd,
      key: "COURSE_ADD",
    },
  ]

  return (
    <TwoColumnLayout
      mainPaneRoutes={mainPaneRoutes}
      rightPaneRoutes={rightPaneRoutes}
    />
  )
}

export default PathwaysSection
