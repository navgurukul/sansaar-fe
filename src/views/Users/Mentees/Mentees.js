import React, { useEffect } from "react"
import {
  Chip,
  withStyles,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
} from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import List from "@material-ui/core/List"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import PersonIcon from "@material-ui/icons/Person"
import DeleteIcon from "@material-ui/icons/Delete"
import { connect } from "react-redux"
import { bindActionCreators, compose } from "redux"
import { map, pullAllBy } from "lodash"
import {
  setAllMentees,
  setUserPathwayToView,
  setUserMenteesList,
  selectors as userSelectors,
} from "../store"
import Spacer from "../../../components/Spacer"
import { ngFetch } from "../../../providers/NGFetch"

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
const Mentees = ({ allUsers, user, theme, classes, actions, allMentees }) => {
  const [pathwayId, setpathwayId] = React.useState("")

  useEffect(() => {
    const fetchData = async () => {
      const response = await ngFetch(
        `/pathways/${pathwayId}/mentorship/users/${user.id}/mentees`,
        {
          method: "GET",
        }
      )
      actions.setAllMentees(response.mentees)
    }
    fetchData()
  }, [actions, pathwayId, user.id])

  const handleAddMentees = async value => {
    const menteesIds = value[0].map(eachMentee => eachMentee.id)
    const response = await ngFetch(
      `/pathways/${pathwayId}/mentorship/users/${user.id}/mentees`,
      {
        method: "POST",
        body: { menteeIds: menteesIds },
      }
    )
    actions.setUserMenteesList(response.mentees)
  }

  const handleDeleteMentee = async eachMentee => {
    const response = await ngFetch(
      `/pathways/${pathwayId}/mentorship/users/${user.id}/mentees`,
      {
        method: "DELETE",
        body: { menteeIds: [eachMentee.id] },
      }
    )
    actions.setUserMenteesList(response.mentees)
  }

  const mentees = React.useMemo(() => Object.values(allMentees), [allMentees])

  const Users = React.useMemo(() => Object.values(allUsers), [allUsers])
  const UserswithSamePathway = []
  const newData =
    Users && pathwayId
      ? Users.map(eachuser =>
          eachuser.pathways.length && eachuser.id !== user.id
            ? eachuser.pathways.map(eachPathway =>
                eachPathway.id === pathwayId
                  ? UserswithSamePathway.push(eachuser)
                  : ""
              )
            : ""
        )
      : ""

  const [value, setValue] = React.useState([])
  return (
    <React.Fragment>
      {user.pathways.length > 0 ? (
        <React.Fragment>
          <Spacer height={theme.spacing(2)} />
          <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel id="new-roles-label">Select pathways</InputLabel>
            <Select
              labelId="new-pathways-label"
              id="new-pathways"
              value={pathwayId}
              onChange={e => setpathwayId(e.target.value)}
              label="Select pathways"
            >
              {map(user.pathways, pathway => {
                return (
                  <MenuItem key={pathway.id} value={pathway.id}>
                    {pathway.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <Spacer height={theme.spacing(1)} />
          <List>
            {mentees
              ? mentees.map(eachMentee => (
                <ListItem key={eachMentee.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={eachMentee.name} />
                  <ListItemSecondaryAction
                    onClick={() => handleDeleteMentee(eachMentee)}
                  >
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                ))
              : ""}
          </List>
          <Autocomplete
            multiple
            limitTags={2}
            onChange={(event, newValue) => {
              setValue([newValue])
            }}
            id="multiple-limit-tags"
            options={pullAllBy(UserswithSamePathway, mentees, "id")}
            getOptionLabel={option => option.name}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Students"
                placeholder="Students"
              />
            )}
          />
          <Spacer height={theme.spacing(2)} />
          <Button
            disableElevation
            color="primary"
            size="small"
            variant="contained"
            onClick={() => handleAddMentees(value)}
          >
            Add Mentees
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Spacer height={theme.spacing(1)} />
          <Chip
            className={classes.chip}
            label="No pathways created in your profile"
            disabled
          />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  allMentees: userSelectors.selectAllMentees(state),
  PathwayMenteesToView: userSelectors.selectPathwayMenteesToView(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { setAllMentees, setUserPathwayToView, setUserMenteesList },
    dispatch
  ),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(Mentees)
