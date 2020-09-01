import React from 'react';
import {  Typography, Button,withTheme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import Spacer from '../../../../components/Spacer';


const MentorshipTree = ({ pathway, theme }) => {
  return(
    <React.Fragment>
      <Typography variant="h5">Mentorship Tree</Typography>
      <Spacer height={theme.spacing(1)} />
      <Button to={`/pathways/${pathway.id}/mentorTree`} component={Link} fullWidth variant="contained" disableElevation color="primary">View Mentor Tree</Button>
    </React.Fragment>
)};


export default compose(
  withTheme,
)(MentorshipTree);