import React from "react"
import { Card, Typography, withStyles } from "@material-ui/core"
import { useDrag, useDrop } from "react-dnd"
import { compose } from "recompose"
import { ItemTypes } from "./ItemTypes"
import UserAvatar from "../../../Users/components/UserCard/UserAvatar"

const styles = () => ({
  card: {
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  cursor: "move",
}
})
const RenderCard = ({ id, text, moveCard, findCard, logo, classes }) => {
  const originalIndex = findCard(id).index
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, originalIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem()
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        moveCard(droppedId, originalIndex)
      }
    },
  })
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id)
        moveCard(draggedId, overIndex)
      }
    },
  })
  const opacity = isDragging ? 0 : 1
  return (
    <Card ref={node => drag(drop(node))} className={classes.card} style={{opacity}}>
      <Typography component="div" variant="overline">
        {text}
      </Typography>
      <UserAvatar name={text} profilePicture={logo} />
    </Card>
  )
}


export default compose(
  withStyles(styles),
)(RenderCard)
