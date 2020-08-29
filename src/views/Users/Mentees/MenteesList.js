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
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import PersonIcon from "@material-ui/icons/Person"
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
const MenteesList = ({ actions, allMentees, pathwayId, user, theme ,allUsers }) => {
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

  const [tree, setTree] = React.useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await ngFetch(`/pathways/${pathwayId}/mentorship/tree`);
      setTree(response.tree);
    }
    fetchData();
  }, [actions,pathwayId,allMentees]);


  const StudentsAlreadyInTree=[]

  const Students =(tree) =>{
    tree ? tree.map((each) =>{ StudentsAlreadyInTree.push(each);each.mentees.length===0?'':Students(each.mentees)}) :''
  }

  const IdsInTree = Students(tree)


  const handleAddMentees = async value => {
    const menteesIds = value[0].map(eachMentee => eachMentee.id)
    const response = await ngFetch(
      `/pathways/${pathwayId}/mentorship/users/${user.id}/mentees`,
      {
        method: "POST",
        body: { menteeIds: menteesIds },
      }
    )
    actions.setUserMenteesList({mentees :response.mentees, userId: user.id})
  }

  const mentees = React.useMemo(() => Object.values(allMentees), [allMentees])

  const Users = React.useMemo(() => Object.values(allUsers), [allUsers])
  const UserswithSamePathway = []

    const newData = React.useMemo(() => {
    const Data=
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
      
    }, [Users,pathwayId,UserswithSamePathway,user.id])



  const [value, setValue] = React.useState([])

  


  const handleDeleteMentee = async eachMentee => {
    const response = await ngFetch(
      `/pathways/${pathwayId}/mentorship/users/${user.id}/mentees`,
      {
        method: "DELETE",
        body: { menteeIds: [eachMentee.id] },
      }
    )
    actions.setUserMenteesList({mentees:response.mentees, userId: user.id})
  }
  return (
    <React.Fragment>
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
              <ListItemSecondaryAction onClick={() => handleDeleteMentee(eachMentee)}>
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
        options={pullAllBy(UserswithSamePathway,StudentsAlreadyInTree, "id")}
        noOptionsText=' No students are there'
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
  withStyles(styles,{ withTheme: true })
)(MenteesList)
