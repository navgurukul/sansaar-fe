import React from "react"
import {
  withStyles,
} from "@material-ui/core"
import { flatten, uniq, map, pullAll, fromPairs } from "lodash"
import { compose } from "redux"
import NG_CONSTANTS from "ng-constants"
import withUserContext from "../../../../providers/UserAuth/withUserContext"
import { ngFetch } from "../../../../providers/NGFetch"
import RenderChips from "./RenderChips"

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
  formControl: {
    width: "100%",
  },
})

const getEditableRoles = currentRoles => {
  return uniq(flatten(currentRoles.map(r => NG_CONSTANTS.editRights[r])))
}

const UserRoleChips = ({
  userId,
  rolesList,
  edit = false,
  setUserRolesList,
  userContext,
}) => {


  const { user: currentUser, refreshUserDetails } = userContext
  const editableRoles = React.useMemo(
    () => getEditableRoles(currentUser.rolesList),
    [currentUser]
  )

  const optionsList = React.useMemo(
    () =>
      fromPairs(rolesList.map(role => [role, NG_CONSTANTS.roleNames[role]])),
    [rolesList]
  )

  const [newChips, setNewChips] = React.useState([])

  const [addDialog, setAddDialog] = React.useState(false)
  const handleDialogClose = () => {
    setAddDialog(false)
    setNewChips([])
  }
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

  const getAddSelectOptions = React.useMemo(
    () =>
      fromPairs(map(pullAll(editableRoles, rolesList), role => [role, NG_CONSTANTS.roleNames[role]])),
    [rolesList,editableRoles]
  )


  return (
    <React.Fragment>
      <RenderChips
        optionsList={optionsList}
        edit={edit}
        onRemove={handleDelete}
        onAdd={handleAddNewRoles}
        title="roles"
        setNewChips={setNewChips}
        handleDialogClose={handleDialogClose}
        addDialog={addDialog}
        setAddDialog={setAddDialog}
        newChips={newChips}
        getAddSelectOptions={getAddSelectOptions}
      />
    </React.Fragment>
  )
}

export default compose(
  withUserContext,
  withStyles(styles, { withTheme: true })
)(UserRoleChips)
