import React from 'react';
import {
  Chip,
  withStyles,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Select,
  Input,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import { flatten, uniq, map, pullAll } from 'lodash';

import { compose } from 'redux';
import NG_CONSTANTS from '../../../../ngConstants';
import Spacer from '../../../../components/Spacer';
import withUserContext from '../../../../providers/UserAuth/withUserContext'
import { ngFetch } from '../../../../providers/NGFetch';

const styles = (theme) => ({
  chipContainer: {
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

const getEditableRoles = (currentRoles) => {
  return uniq(flatten( currentRoles.map(r => NG_CONSTANTS.editRights[r]) ));
}

const UserRoleChips = ({
  userId,
  rolesList,
  classes,
  edit = false,
  setUserRolesList,
  theme,
  userContext,
}) => {

  const [addRoleDialog, setAddRoleDialog] = React.useState(false);
  const [newRoles, setNewRoles] = React.useState([]);
  
  const { user: currentUser, refreshUserDetails } = userContext;
  const editableRoles = React.useMemo(() => getEditableRoles(currentUser.rolesList), [currentUser]);

  const handleDelete = async (role) => {
    await ngFetch(`/users/${userId}/roles`, {
      method: 'DELETE',
      body: { rolesList: [role] }
    });
    setUserRolesList({ rolesList: rolesList.filter(r => r !== role), userId  });
    if (currentUser.id === userId) refreshUserDetails()
  }
  

  const handleAddNewRoles = async () => {
    const response = await ngFetch(`/users/${userId}/roles`, {
      method: 'POST',
      body: { rolesList: newRoles }
    });
    setUserRolesList({ rolesList: response.user.rolesList, userId });
    setAddRoleDialog(false);
    setNewRoles([]);
    if (currentUser.id === userId) refreshUserDetails()
  }

  const handleDialogClose = () => {
    setAddRoleDialog(false);
    setNewRoles([]);
  }


  return (
    <React.Fragment>
      <Box className={classes.chipContainer}>
        {rolesList.length === 0 ? (
          <Chip className={classes.chip} label="No Roles Assigned" disabled />
        ) : (
          rolesList.map(role => 
            (
              <Chip
                className={classes.chip}
                label={NG_CONSTANTS.roleNames[role]}
                key={role}
                onDelete={edit ? () => handleDelete(role) : undefined}
              />
            )
          )
        )}
      </Box>
      {edit && (
        <React.Fragment>
          <Spacer height={theme.spacing(1)} />
          <Button
            disableElevation
            color="primary"
            size="small"
            variant="contained"
            onClick={() => setAddRoleDialog(true)}
          >
            Add Role
          </Button>
          <Dialog disableBackdropClick disableEscapeKeyDown open={addRoleDialog}>
            <DialogTitle>Add Roles</DialogTitle>
            <DialogContent>
              <DialogContentText>Select the roles you want to add to the selected user here.</DialogContentText>
              <FormControl variant="outlined" style={{ width: '100%' }}>
                <InputLabel id="new-roles-label">Select Roles</InputLabel>
                <Select
                  labelId="new-roles-label"
                  id="new-roles"
                  multiple
                  value={newRoles}
                  onChange={(e) => setNewRoles(e.target.value)}
                  label="Select Roles"
                >
                  {map(pullAll(editableRoles, rolesList), role => {
                    return <MenuItem key={role} value={role}>{NG_CONSTANTS.roleNames[role]}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button color="primary" onClick={handleAddNewRoles}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}


export default compose(
  withUserContext,
  withStyles(styles, {withTheme: true}),
)(UserRoleChips);