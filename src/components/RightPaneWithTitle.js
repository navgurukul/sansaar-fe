import React from 'react';
import { withStyles, Typography, IconButton, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import history from '../providers/routing/app-history';
import Spacer from './Spacer';

const styles = () => ({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

const RightPaneWithTitle = ({ children, title, closeLink, theme, classes }) => {

  const handleCloseClick = () => history.push(closeLink);

  return (
    <React.Fragment>
      <Box className={classes.titleContainer}>
        <Typography variant="h4">{title}</Typography>
        <IconButton onClick={handleCloseClick}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Spacer height={theme.spacing(3)} />
      {children}
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(RightPaneWithTitle);