import React from "react"
import TwoColumnLayout from "../../layouts/TwoColumn"
import ClassesList from "./Classes/List"
import ClassAdd from "./Classes/Add"
import ClassEdit from "./Classes/Edit"

const ClassesSection = () => {
  const mainPaneRoutes = [
    {
      path: "/classes",
      exact: false,
      component: ClassesList,
      key: "CLASSES_LIST",
    },
  ]
  const rightPaneRoutes = [
    {
      path: "/classes/add",
      exact: true,
      component: ClassAdd,
      key: "CLASS_ADD",
    },
    {
      path: "/classes/:classId",
      exact: true,
      component: ClassEdit,
      key: "CLASS_EDIT",
    },
  ]

  return (
    <TwoColumnLayout
      mainPaneRoutes={mainPaneRoutes}
      rightPaneRoutes={rightPaneRoutes}
    />
  )
}

export default ClassesSection
