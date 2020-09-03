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
import { compose } from "redux"
import Spacer from "../../../../components/Spacer"
import withUserContext from "../../../../providers/UserAuth/withUserContext"

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

const ChipList = ({
  optionsList,
  classes,
  edit,
  onRemove,
  theme,
  title,
  onAdd,
  getAddSelectOptions,
}) => {
  const keys = Object.keys(optionsList)
  const menuKeys = Object.keys(getAddSelectOptions)

  const [newChips, setNewChips] = React.useState([])

  const [addDialog, setAddDialog] = React.useState(false)
  const handleDialogClose = () => {
    setAddDialog(false)
    setNewChips([])
  }

  return (
    <React.Fragment>
      <Box className={classes.chipContainer}>
        {keys.length === 0 ? (
          <Chip
            className={classes.chip}
            label={`No ${title} Assigned`}
            disabled
          />
        ) : (
          keys.map(key => (
            <Chip
              className={classes.chip}
              label={optionsList[key]}
              key={key}
              onDelete={edit ? () => onRemove(key) : undefined}
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
            {`Add ${title}`}
          </Button>
          <Dialog disableBackdropClick disableEscapeKeyDown open={addDialog}>
            <DialogTitle>{`Add ${title}`}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {`Select the ${title} you want to add to the selected user here.`}
              </DialogContentText>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="new-roles-label">{`Select ${title}`}</InputLabel>
                <Select
                  labelId={`new-${title}-label`}
                  id={`new-${title}`}
                  multiple
                  value={newChips}
                  onChange={e => setNewChips(e.target.value)}
                  label={`Select ${title}`}
                >
                  {menuKeys.map(key => {
                    return (
                      <MenuItem key={key} value={key}>
                        {getAddSelectOptions[key]}
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
              <Button color="primary" onClick={() => onAdd(newChips, setAddDialog, setNewChips)}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default compose(
  withUserContext,
  withStyles(styles, { withTheme: true })
)(ChipList)
