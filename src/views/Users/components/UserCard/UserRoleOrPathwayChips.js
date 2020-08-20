import React from "react"
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
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core"
import { flatten, uniq, map, pullAll, pullAllBy } from "lodash"
import { compose } from "redux"
import NG_CONSTANTS from "../../../../ngConstants"
import Spacer from "../../../../components/Spacer"
import withUserContext from "../../../../providers/UserAuth/withUserContext"
import { ngFetch } from "../../../../providers/NGFetch"

const styles = theme => ({
  chipContainer: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  chip: {
    "&:nth-child(1)": {
      marginLeft: 0,
    },
  },
})

const getEditableRoles = currentRoles => {
  return uniq(flatten(currentRoles.map(r => NG_CONSTANTS.editRights[r])))
}

const UserRoleOrPathwayChips = ({
  userId,
  rolesList,
  pathwaysList,
  classes,
  edit = false,
  setUserRolesList,
  setUserPathwaysList,
  theme,
  userContext,
  header,
  allPathways,
}) => {

  const { user: currentUser, refreshUserDetails } = userContext
  const editableRoles = React.useMemo(
    () => getEditableRoles(currentUser.rolesList),
    [currentUser]
  )

  const [addDialog, setAddDialog] = React.useState(false)
  const [newChips, setNewChips] = React.useState([])
  
  const handleDialogClose = () => {
    setAddDialog(false)
    setNewChips([])
  }


  const rolesListChips = () => {
    const handleDelete = async role => {
      await ngFetch(`/users/${userId}/roles`, {
        method: "DELETE",
        body: { rolesList: [role] },
      })
      setUserRolesList({ rolesList: rolesList.filter(r => r !== role), userId })
      if (currentUser.id === userId) refreshUserDetails()
    }

    const handleAddNewRoles = async () => {
      const response = await ngFetch(`/users/${userId}/roles`, {
        method: "POST",
        body: { rolesList: newChips },
      })
      setUserRolesList({ rolesList: response.user.rolesList, userId })
      setAddDialog(false)
      setNewChips([])
      if (currentUser.id === userId) refreshUserDetails()
    }


    return (
      <React.Fragment>
        <Box className={classes.chipContainer}>
          {rolesList.length === 0 ? (
            <Chip className={classes.chip} label="No Roles Assigned" disabled />
          ) : (
            rolesList.map(role => (
              <Chip
                className={classes.chip}
                label={NG_CONSTANTS.roleNames[role]}
                key={role}
                onDelete={edit ? () => handleDelete(role) : undefined}
              />
            ))
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
              onClick={() => setAddDialog(true)}
            >
              Add Role
            </Button>
            <Dialog disableBackdropClick disableEscapeKeyDown open={addDialog}>
              <DialogTitle>Add Roles</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Select the roles you want to add to the selected user here.
                </DialogContentText>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel id="new-roles-label">Select Roles</InputLabel>
                  <Select
                    labelId="new-roles-label"
                    id="new-roles"
                    multiple
                    value={newChips}
                    onChange={e => setNewChips(e.target.value)}
                    label="Select Roles"
                  >
                    {map(pullAll(editableRoles, rolesList), role => {
                      return (
                        <MenuItem key={role} value={role}>
                          {NG_CONSTANTS.roleNames[role]}
                        </MenuItem>
                      )
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
    )
  }

  const pathwaysListChips = () => {
    const handleDelete = async id => {
      await ngFetch(`/users/${userId}/pathways`, {
        method: "DELETE",
        body: { pathwayIds: [id] },
      })
      setUserPathwaysList({
        pathways: pathwaysList.filter(pathway => pathway.id !== id),
        userId,
      })
    }

    const handleAddNewPathways = async () => {

      const response = await ngFetch(`/users/${userId}/pathways`, {
        method: "POST",
        body: { pathwayIds: newChips },
      })

      setUserPathwaysList({ pathways: response.user.pathways, userId, pathwayIds:newChips  })
      setAddDialog(false)
      setNewChips([])
    }

    return (
      <React.Fragment>
        <Box className={classes.chipContainer}>
          {pathwaysList.length === 0 ? (
            <Chip
              className={classes.chip}
              label="No pathways Created"
              disabled
            />
          ) : (
            pathwaysList.map(pathway => (
              <Chip
                className={classes.chip}
                label={pathway.name}
                key={pathway.id}
                onDelete={edit ? () => handleDelete(pathway.id) : undefined}
              />
            ))
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
              onClick={() => setAddDialog(true)}
            >
              Add Pathway
            </Button>
            <Dialog disableBackdropClick disableEscapeKeyDown open={addDialog}>
              <DialogTitle>Add Pathways</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Select the Pathways you want to add to the selected user here.
                </DialogContentText>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel id="new-roles-label">Select Pathways</InputLabel>
                  <Select
                    labelId="new-pathways-label"
                    id="new-pathways"
                    multiple
                    value={newChips}
                    onChange={e => setNewChips(e.target.value)}
                    label="Select Pathways"
                  >
                    {map(pullAllBy(allPathways, pathwaysList, 'id'), pathway => {
                      return (
                        <MenuItem key={pathway.id} value={pathway.id}>
                          {pathway.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  Cancel
                </Button>
                <Button color="primary" onClick={handleAddNewPathways}>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }

  let renderChips = header === 'roles' ? rolesListChips() : '';
  if (renderChips) {
    renderChips = rolesListChips();
  } else if (header === 'pathways') {
    renderChips = pathwaysListChips();
  } else {
    renderChips = '';
  }
  return (
    <React.Fragment>
      {renderChips}
    </React.Fragment>
  )
}

export default compose(
  withUserContext,
  withStyles(styles, { withTheme: true })
)(UserRoleOrPathwayChips)
