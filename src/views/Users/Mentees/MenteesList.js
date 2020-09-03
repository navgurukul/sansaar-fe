import React, { useEffect } from "react"
import {
  List,
  ListItem,
  withStyles,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
} from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import { connect } from "react-redux"
import { bindActionCreators, compose } from "redux"
import { pullAllBy } from "lodash"
import {
  setAllMentees,
  setUserPathwayToView,
  setUserMenteesList,
  selectors as userSelectors,
} from "../store"
import Spacer from "../../../components/Spacer"
import { ngFetch } from "../../../providers/NGFetch"
import UserAvatar from "../components/UserCard/UserAvatar"

const styles = () => ({
  button: {
    width: "100%",
  },
})

const MenteesList = ({
  actions,
  allMentees,
  pathwayId,
  user,
  theme,
  allUsers,
  classes,
}) => {
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
  }, [pathwayId, user.id, actions])

  const [tree, setTree] = React.useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await ngFetch(`/pathways/${pathwayId}/mentorship/tree`)
      setTree(response.tree)
    }
    fetchData()
  }, [actions, pathwayId, allMentees])

  const studentsAlreadyInTree = []

  const Students = mentorTree => {
    mentorTree
      ? mentorTree.forEach(student => {
          studentsAlreadyInTree.push(student)
          student.mentees.length === 0 ? "" : Students(student.mentees)
        })
      : ""
  }

  const idsInTree = Students(tree)
  const [value, setValue] = React.useState([])

  const handleAddMentees = async value => {
    const menteesIds = value[0].map(mentee => mentee.id)
    const response = await ngFetch(
      `/pathways/${pathwayId}/mentorship/users/${user.id}/mentees`,
      {
        method: "POST",
        body: { menteeIds: menteesIds },
      }
    )
    setValue(null)
    actions.setUserMenteesList({ mentees: response.mentees, userId: user.id })
  }

  const mentees = React.useMemo(() => Object.values(allMentees), [allMentees])

  const users = React.useMemo(() => Object.values(allUsers), [allUsers])
  const usersWithSamePathway = []

  const newData = React.useMemo(() => {
    if (users && pathwayId) {
      users.forEach(u => {
          if (u.pathways.length && u.id !== user.id) {
            u.pathways.map(eachPathway =>
                  eachPathway.id === pathwayId
                    ? usersWithSamePathway.push(u)
                    : ""
                )
          }
      })
  }
  }, [users, pathwayId, usersWithSamePathway, user.id])

  

  const handleDeleteMentee = async mentee => {
    const response = await ngFetch(
      `/pathways/${pathwayId}/mentorship/users/${user.id}/mentees`,
      {
        method: "DELETE",
        body: { menteeIds: [mentee.id] },
      }
    )
    actions.setUserMenteesList({ mentees: response.mentees, userId: user.id })
  }

  const showMenteesList = students => {
    return students.map(mentee => (
      <ListItem key={mentee.id}>
        <ListItemAvatar>
          <UserAvatar
            name={mentee.name}
            profilePicture={mentee.profile_picture}
          />
        </ListItemAvatar>
        <ListItemText primary={mentee.name} />
        <ListItemSecondaryAction onClick={() => handleDeleteMentee(mentee)}>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))
  }

  return (
    <React.Fragment>
      <List>{mentees && showMenteesList(mentees)}</List>
      <Autocomplete
        multiple
        limitTags={2}
        onChange={(event, newValue) => {
          setValue([newValue])
        }}
        value={value}
        id="multiple-limit-tags"
        options={pullAllBy(usersWithSamePathway, studentsAlreadyInTree, "id")}
        noOptionsText=" No students are there"
        getOptionLabel={option => option.name}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Students to add"
            placeholder="Students"
          />
        )}
      />
      <Spacer height={theme.spacing(1)} />
      <Button
        className={classes.button}
        disableElevation
        color="primary"
        size="small"
        variant="contained"
        onClick={() => handleAddMentees(value)}
      >
        Add Mentees
      </Button>
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
)(MenteesList)
