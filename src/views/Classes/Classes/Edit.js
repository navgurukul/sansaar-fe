import React, { useEffect } from "react"
import { bindActionCreators } from "redux"
import { withRouter } from "react-router"
import { compose } from "recompose"
import { connect } from "react-redux"
import { useSnackbar } from "notistack"
import { withTheme ,Container } from "@material-ui/core"
import {
  selectors as layoutSelectors,
  setRightPaneLoading,
} from "../../../layouts/TwoColumn/store"
import { ngFetch } from "../../../providers/NGFetch"
import { getClassEditFormStructure } from "./form"
import FormBuilder from "../../../components/FormBuilder"
import Spacer from "../../../components/Spacer"
import RightPaneWithTitle from "../../../components/RightPaneWithTitle"

const ClassEdit = ({ 
    // rightPaneLoading, 
    actions, match, theme 
}) => {
  const { classId } = match.params
  // const { enqueueSnackbar } = useSnackbar()

  const [classopened , setClassOpened] = React.useState(null)
  useEffect(() => {
    const fetchData = async () => {
      actions.setRightPaneLoading(true)
      const responseOfClassOpened = await ngFetch(
        `/classes/${classId}/`
      )
    setClassOpened(responseOfClassOpened)
      actions.setRightPaneLoading(false)
    }
    fetchData()
  }, [classId, actions])


  return (
    <Container>
      <RightPaneWithTitle
        title="Edit Classes"
        closeLink="/classes"
      >
        <FormBuilder
          structure={getClassEditFormStructure(classopened)}
          initialValues={classopened}
        />
        <Spacer height={theme.spacing(2)} />
      </RightPaneWithTitle>
    </Container>
  )
}

const mapStateToProps = state => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { 
        setRightPaneLoading, 
    },
    dispatch
  ),
})

export default compose(
  withTheme,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ClassEdit)
