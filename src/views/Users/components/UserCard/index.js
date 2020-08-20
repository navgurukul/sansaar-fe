import React from 'react';
import moment from 'moment';
import { withStyles, Card, CardContent, Typography, Box } from '@material-ui/core';
import UserAvatar from './UserAvatar';
import UserRoleOrPathwayChips from './UserRoleOrPathwayChips';
import Spacer from '../../../../components/Spacer';

const styles = (theme) => ({
  container: {
    marginBottom: theme.spacing(2),
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameEmailContainer: {
    marginLeft: theme.spacing(2)
  },
});

const UserCard = ({
  key,
  name,
  profilePicture,
  rolesList,
  eMail,
  joinedAt,
  classes,
  theme,
}) => (
  <Card key={key || undefined} className={classes.container} variant="outlined">
    <CardContent>
      <Box className={classes.header}>
        <UserAvatar name={name} profilePicture={profilePicture} widthHeight={theme.spacing(6)} />
        <Box className={classes.nameEmailContainer}>
          <Typography variant="h6">{name}</Typography>
          <Typography>{eMail}</Typography>
        </Box>
      </Box>
      <Spacer height={theme.spacing(1)} />
      <UserRoleOrPathwayChips header="roles" rolesList={rolesList} />
      <Typography variant="overline">
        Joined
        { moment(joinedAt).fromNow() }
      </Typography>
    </CardContent>
  </Card>
);

export default withStyles(styles, { withTheme: true })(UserCard);