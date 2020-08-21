import React from "react"
import {
  withStyles,
  Typography,
  Box,
  Button,
} from "@material-ui/core"

import history from "../providers/routing/app-history"
import Spacer from "./Spacer"

const styles = () => ({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
})

const MainPaneWithTitle = ({ children, title, addBtnLink, theme, classes }) => {
  const handleAddClick = () => history.push(addBtnLink)

  return (
    <React.Fragment>
      <Box className={classes.titleContainer}>
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Spacer height={theme.spacing(1)} />
      <Box>
        {addBtnLink ? (
          <Button variant="contained" color="primary" onClick={handleAddClick}>
            Add 
            {' '}
            {title}
          </Button>
        ) : (
          ""
        )}
      </Box>
      <Spacer height={theme.spacing(3)} />
      {children}
    </React.Fragment>
  )
}

export default withStyles(styles, { withTheme: true })(MainPaneWithTitle)
