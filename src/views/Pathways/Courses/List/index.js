import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {  withTheme } from "@material-ui/core"
import { compose } from "recompose"
import { withRouter } from 'react-router';
import Container from './Container'

const CoursesList =({
    pathwayId,
  }) => {
  return (
    <React.Fragment>
      <DndProvider backend={HTML5Backend}>
        <Container pathwayId={pathwayId} />
      </DndProvider>
    </React.Fragment>
  )
}


export default compose(
  withTheme,
  withRouter,
)(CoursesList)