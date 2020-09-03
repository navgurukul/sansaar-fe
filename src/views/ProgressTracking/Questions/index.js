import React from "react"
import TwoColumnLayout from "../../../layouts/TwoColumn"
import QuestionsList from "./List"
import QuestionAdd from "./Add"
import QuestionEdit from "./Edit"

const QuestionsSection = () => {
  const mainPaneRoutes = [
    {
      path: "/progressTracking/questions",
      exact: false,
      component: QuestionsList,
      key: "QUESTIONS_LIST",
    },
  ]

  const rightPaneRoutes = [
    {
      path: "/progressTracking/questions/add",
      exact: true,
      component: QuestionAdd,
      key: "QUESTIONS_ADD",
    },
    {
      path: "/progressTracking/questions/:questionId",
      exact: true,
      component: QuestionEdit,
      key: "QUESTIONS_EDIT",
    },
  ]

  return (
    <TwoColumnLayout
      mainPaneRoutes={mainPaneRoutes}
      rightPaneRoutes={rightPaneRoutes}
    />
  )
}

export default QuestionsSection
