import React from "react"
import moment from "moment"
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core"
import Spacer from "../../../../components/Spacer"
import {toTitleCase} from '../../../../helpers';

const styles = theme => ({
  container: {
    marginBottom: theme.spacing(2),
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  nameContainer: {
    // marginLeft: theme.spacing(2),
  },
})

const PathwayCard = ({
  key,
  name,
  // code,
  description,
  joinedAt,
  classes,
  theme,
}) => (
  <Card key={key || undefined} className={classes.container} variant="outlined">
    <CardContent>
      <Box className={classes.header}>
        <Box className={classes.nameContainer}>
          {/* <Typography variant="h4">{code}</Typography> */}
          <Typography variant="h4">{toTitleCase(name)}</Typography>
        </Box>
      </Box>
      <Spacer height={theme.spacing(2)} />
      <Box>
        <Typography variant="overline">{description}</Typography>
      </Box>
      <Box>
        <Typography variant="overline">
          Joined
          {moment(joinedAt).fromNow()}
        </Typography>
      </Box>
    </CardContent>
  </Card>
)

export default withStyles(styles, { withTheme: true })(PathwayCard)
