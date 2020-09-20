import React from "react"
import { Chip ,withStyles ,Typography, Box } from "@material-ui/core"
import CustomCard from "../../../../components/TableOrCardList/CustomCard"
import TrackingFormQuestionAdd from "./Add"
import Spacer from '../../../../components/Spacer';

const styles=() =>({
  isQuestionThere:{
    width:"100%"
  }
})
const TrackingFormQuestions = ({ questions, pathwayId, classes,theme }) => {
  return (
    <Box>
      <Spacer height={theme.spacing(2)} />
      <Typography variant="h5">Trackingform Questions</Typography>
      <Spacer height={theme.spacing(2)} />
      {questions && questions.questions.length ? (
        <CustomCard data={questions.questions} keys={["name", "description"]} />
      ) : (
        <React.Fragment>
          <Chip className={classes.isQuestionThere} disabled label="No questions are there" />
          <Spacer height={theme.spacing(2)} />
        </React.Fragment>
      )}
      <TrackingFormQuestionAdd pathwayId={pathwayId} />
    </Box>
  )
}

export default withStyles(styles,{withTheme:true})(TrackingFormQuestions)
