import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'


const style = {
  width: '100%',
  color: 'white',
  fontSize: '1rem',
  textAlign:"center",
  lineHeight: 'normal',
}
const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = canDrop && isOver
  let backgroundColor = '#3F51B5'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div ref={drop} style={{ ...style, backgroundColor }}>
        {isActive ? 'Release to drop' : 'Drag a course here to delete'}
      </div>
    </React.Fragment>
  )
}

export default Dustbin