import React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Button,withTheme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import Spacer from '../../../../components/Spacer';

const Courses = ({ pathway, theme }) => (
  <React.Fragment>
    <Spacer height={theme.spacing(2)} />
    <Typography variant="h5">Courses</Typography>
    {pathway.courses.length >  0 ? (
      <List>
        {pathway.courses.map(course => (
          <ListItem key={course.id}>
            <ListItemIcon><FlagIcon /></ListItemIcon>
            {/* <ListItemText primary={course.courses.name} secondary={milestone.description} /> */}
          </ListItem>
        ))}
      </List>
    ): (
      <React.Fragment>
        <Typography variant="subtitle1">No Courses created yet.</Typography>
        <Spacer height={theme.spacing(2)} />
      </React.Fragment>
    )}
    <Button to={`/courses/pathways/${pathway.id}/`} component={Link} fullWidth variant="contained" disableElevation color="primary">View/Edit Courses</Button>
  </React.Fragment>
);


export default compose(
  withTheme,
)(Courses);