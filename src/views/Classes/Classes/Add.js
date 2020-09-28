import React from "react"
import { useSnackbar } from "notistack"
import { compose } from "recompose"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Container } from "@material-ui/core"
import RightPaneWithTitle from "../../../components/RightPaneWithTitle"
import FormBuilder from "../../../components/FormBuilder"
import history from "../../../providers/routing/app-history"
import { getClassAddFormStructure } from "./form"
import { ngFetch } from "../../../providers/NGFetch"

const ClassAdd = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false)

  const onSubmit = async data => {
    setSubmitBtnDisabled(true)
    const response = await ngFetch("/classes", { method: "POST", body: data})
    enqueueSnackbar("Class created.", { variant: "success" })
    setSubmitBtnDisabled(false)
    history.push("/classes")
  }



  return (
    <Container>
      <RightPaneWithTitle title="Add Class" closeLink="/classes">
        <FormBuilder
          structure={getClassAddFormStructure()}
          onSubmit={onSubmit}
          submitBtnDisabled={submitBtnDisabled}
        />
      </RightPaneWithTitle>
    </Container>
  )
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators( {}, dispatch),
})

export default compose(connect(null, mapDispatchToProps))(ClassAdd)
