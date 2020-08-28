import React from "react"
import moment from "moment"
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core"
import Spacer from "../Spacer";
import UserAvatar from '../../views/Users/components/UserCard/UserAvatar';
import UserRoleOrPathwayChips from '../../views/Users/components/UserCard/UserRoleOrPathwayChips';

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

const RenderCards = ({
  key,
  row,
  classes,
  tableColumns,
  theme,
  titleKey
}) => {
  return(
    <Card key={key || undefined} className={classes.container} variant="outlined">
      <CardContent>
        {
        titleKey ? (
          <React.Fragment>
            <Typography variant="h3">{titleKey}</Typography>
            <Spacer height={theme.spacing(2)} />
          </React.Fragment>
      )
        : ''
      }

        {row.profile_picture ? (
          <React.Fragment>
            <Box className={classes.header}>
              <UserAvatar name={row.name} profilePicture={row.profile_picture} widthHeight={theme.spacing(6)} />
            </Box>
            <Spacer height={theme.spacing(1)} />
          </React.Fragment>
      )
      : ''}
      
        {tableColumns.map(eachcolumn => {
        return(
          <React.Fragment key={eachcolumn.priority}>
            {eachcolumn.Header ? (
              <React.Fragment>
                <Typography variant="overline">{eachcolumn.Header}</Typography>
                <Typography variant="body1">{eachcolumn.accessor === 'created_at' ? moment(row.created_at).fromNow() : row[eachcolumn.accessor]}</Typography>
                {eachcolumn.accessor === 'rolesList' ? <UserRoleOrPathwayChips header="roles" rolesList={row.rolesList} /> : ''}
                <Spacer height={theme.spacing(1)} />

              </React.Fragment>
)
          : ''}
            
          </React.Fragment>
        )
    })}
      </CardContent>
    </Card>
)}

export default withStyles(styles, { withTheme: true })(RenderCards)
