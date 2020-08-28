import React from "react"
import {
  Chip,
  withStyles,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core"
import { connect } from "react-redux"
import { bindActionCreators, compose } from "redux"
import { map } from "lodash"
import {
  setAllMentees,
  setUserPathwayToView,
  setUserMenteesList,
  selectors as userSelectors,
} from "../store"
import Spacer from "../../../components/Spacer"
import MenteesList from './MenteesList';



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
  helperText:{
    color:'red',
  }
})
const Mentees = ({ allUsers, user, theme, classes }) => {
  const [pathwayId, setpathwayId] = React.useState("")


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
            <Spacer height={theme.spacing(1)} />
            {pathwayId === '' ? <Chip label="No Pathways selected" /> : ''}
          </FormControl>
          <Spacer height={theme.spacing(1)} />
          {user.id && pathwayId ? <MenteesList user={user} pathwayId={pathwayId} allUsers={allUsers} /> : ''}

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
