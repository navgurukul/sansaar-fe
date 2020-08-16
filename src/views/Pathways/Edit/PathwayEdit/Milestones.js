import React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Milestones = ({ pathway }) => (
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
      <Typography variant="subtitle1">No milestones created yet.</Typography>
    )}
    <Button to={`/pathways/${pathway.id}/milestones`} component={Link} fullWidth variant="contained" disableElevation color="primary">View/Edit Milestones</Button>
  </React.Fragment>
);

export default Milestones;