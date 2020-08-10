import React from 'react';

import { Chip, withStyles, Box } from '@material-ui/core';

const styles = (theme) => ({
  container: {
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  chip: {
    '&:nth-child(1)': {
      marginLeft: 0,
    },
  }
})

const UserRoleChips = ({ rolesList, classes }) => (
  <Box className={classes.container}>
    {rolesList.length === 0 ? (
      <Chip className={classes.chip} label={'No Roles'} disabled />
    ) : (
      rolesList.map(role => <Chip className={classes.chip} label={role} key={role} />)
    )}
  </Box>
);

export default withStyles(styles, {withTheme: true})(UserRoleChips);