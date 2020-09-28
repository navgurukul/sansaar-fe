import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"
import { Box, withStyles, Typography,Container } from "@material-ui/core"
import { compose } from "recompose"
import moment from "moment"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import RightPaneWithTitle from "../../components/RightPaneWithTitle"
import UserAvatar from "./components/UserCard/UserAvatar"
import UserRoleChips from "./components/UserCard/UserRoleChips"
import PathwayChips from "./components/UserCard/PathwayChips"
import Spacer from "../../components/Spacer"
import {
  selectors,
  setUserToView,
  setUserRolesList,
  setUserPathwaysList,
} from "./store"
import {
  setRightPaneLoading,
  selectors as layoutSelectors,
} from "../../layouts/TwoColumn/store"
import { ngFetch } from "../../providers/NGFetch"
import Mentees from './Mentees/Mentees';

const styles = () => ({
  avatarContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  closeBtn: {
    float: "right",
  },
})

function UserView({ match, classes, theme, actions, user, rightPaneLoading, allUsers }) {
  const { userId } = match.params

  useEffect(() => {
    const fetchData = async () => {
      actions.setRightPaneLoading(true)
      const response = await ngFetch(`/users/${userId}`)
      actions.setUserToView(response.user)
      actions.setRightPaneLoading(false)
    }
    fetchData()
  }, [actions, userId])


  const [allPathways, setAllpathways] = React.useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await ngFetch(`/pathways`, {
        method: "GET",
      })
      setAllpathways(response.pathways)
    }
    fetchData()
  }, [])

  if (rightPaneLoading || !user) {
    return <React.Fragment />
  }

  return (
    <Container>
      <RightPaneWithTitle closeLink="/users">
        <Box className={classes.avatarContainer}>
          <UserAvatar
            name={user.name}
            profilePicture={user.profile_picture}
            widthHeight={200}
          />
        </Box>
        <Spacer height={theme.spacing(2)} />
        <Typography variant="overline">NAME</Typography>
        <Typography variant="body1">{user.name}</Typography>
        <Spacer height={theme.spacing(1)} />
        <Typography variant="overline">E-MAIL</Typography>
        <Typography variant="body1">{user.email}</Typography>
        <Spacer height={theme.spacing(1)} />
        <Typography variant="overline">GOOGLE USER ID</Typography>
        <Typography variant="body1">{user.google_user_id}</Typography>
        <Spacer height={theme.spacing(1)} />
        <Typography variant="overline">JOINED</Typography>
        <Typography variant="body1">
          {moment(user.createdAt).fromNow()}
        </Typography>
        <Spacer height={theme.spacing(1)} />
        <Typography variant="overline">ROLES</Typography>
        <UserRoleChips
          rolesList={user.rolesList}
          header="roles"
          edit
          userId={user.id}
          setUserRolesList={actions.setUserRolesList}
        />
        <Spacer height={theme.spacing(1)} />
        <Typography variant="overline">Pathways</Typography>
        <PathwayChips
          pathwaysList={user.pathways}
          header="pathways"
          edit
          userId={user.id}
          setUserPathwaysList={actions.setUserPathwaysList}
          allPathways={allPathways}
        />
        <Spacer height={theme.spacing(1)} />
        <Typography variant="overline">MENTEES</Typography>
        <Mentees allUsers={allUsers} user={user} />
      </RightPaneWithTitle>
    </Container>
  )
}

const mapStateToProps = state => ({
  user: selectors.selectUserToView(state),
  allUsers: selectors.selectAllUsers(state),
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setUserToView,
      setUserRolesList,
      setRightPaneLoading,
      setUserPathwaysList,
    },
    dispatch
  ),
})

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(UserView)
