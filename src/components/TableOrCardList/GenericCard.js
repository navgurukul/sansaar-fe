import React from "react"
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core"
import Spacer from "../Spacer";

const styles = theme => ({
  container: {
    marginBottom: theme.spacing(2),
  },
})

const GenericCard = ({
  row,
  classes,
  theme,
  titleKey
}) => {
  return(
    <Card className={classes.container} variant="outlined">
      <CardContent>
        <Typography component="div" variant="h4">{row.original[titleKey]}</Typography>
        <Spacer height={theme.spacing(1)} />
        {row.allCells.map(cell => {
        return(
          <React.Fragment key={cell.column.priority}>
            <Box {...cell.getCellProps()}>
              <Typography component="div" variant="overline">{cell.column.Header}</Typography>
              <Typography component="div" variant="body1">{cell.render("Cell")}</Typography>
              <Spacer height={theme.spacing(1)} />
            </Box>
          </React.Fragment>
        )
    })}
      </CardContent>
    </Card>
)}

export default withStyles(styles, { withTheme: true })(GenericCard)
