import React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Button,withTheme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import Spacer from '../../../../components/Spacer';

const Milestones = ({ pathway, theme }) => (
  <React.Fragment>
    <Typography variant="h5">Milestones</Typography>
    {pathway.milestones.length >  0 ? (
      <List>
        {pathway.milestones.map(milestone => (
          <ListItem key={milestone.id}>
            <ListItemIcon><FlagIcon /></ListItemIcon>
            <ListItemText primary={milestone.name} secondary={milestone.description} />
          </ListItem>
        ))}
      </List>
    ): (
      <React.Fragment>
        <Typography variant="subtitle1">No milestones created yet.</Typography>
        <Spacer height={theme.spacing(2)} />
      </React.Fragment>
    )}
    <Button to={`/pathways/${pathway.id}/milestones`} component={Link} fullWidth variant="contained" disableElevation color="primary">View/Edit Milestones</Button>
  </React.Fragment>
);


export default compose(
  withTheme,
)(Milestones);