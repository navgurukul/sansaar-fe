import React from "react"
import { useDrop } from "react-dnd"
import { withStyles } from "@material-ui/core"
import { ItemTypes } from "./ItemTypes"
import Spacer from "../../../../components/Spacer"

const styles = () => ({
  dustbinNotActive: {
    width: "100%",
    color: "white",
    fontSize: "1rem",
    textAlign: "center",
    lineHeight: "normal",
    backgroundColor: "#3F51B5",
    borderRadius:15,
    padding:20
  },
  dustbinActive: {
    width: "100%",
    color: "white",
    fontSize: "1rem",
    textAlign: "center",
    lineHeight: "normal",
    backgroundColor: "darkgreen",
    borderRadius:15,
    padding:20
  }
})
const Dustbin = ({ theme, classes }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ name: "Dustbin" }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = canDrop && isOver
  return (
    <React.Fragment>
      <Spacer height={theme.spacing(10)} />
      <div
        ref={drop}
        className={isActive ? classes.dustbinActive : classes.dustbinNotActive}
      >
        {isActive ? "Release to delete course" : "Drag a course here to delete"}
      </div>
    </React.Fragment>
  )
}

export default withStyles(styles, { withTheme: true })(Dustbin)
