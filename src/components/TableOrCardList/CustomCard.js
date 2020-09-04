import React from "react"
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core"
import {get} from 'lodash'
import Spacer from "../Spacer";

const styles = theme => ({
  container: {
    marginBottom: theme.spacing(2),
  },
})

const CustomCard = ({
  data,
  classes,
  theme,
  keys,
}) => {
  return(
    <React.Fragment>
      {data.map(item=> {
        return(

          <Card className={classes.container} variant="outlined" key={item.id}>
            <CardContent>
              <Box>
                {keys.map(key => (
                  <React.Fragment key={key}>
                    <Typography component="div" variant="overline">{key}</Typography>
                    <Typography component="div" variant="body1">{get(item, key, '')}</Typography>
                  </React.Fragment>
))}
                <Spacer height={theme.spacing(1)} />
              </Box>
            </CardContent>
          </Card>
        )
    })}
    </React.Fragment>
      
)}

export default withStyles(styles, { withTheme: true })(CustomCard)
