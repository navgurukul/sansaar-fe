import React from "react"
import { Avatar } from "@material-ui/core"

import { getInitialsFromName } from "../../../../helpers"

const UserAvatar = ({ name, profilePicture, widthHeight }) => {
  const style = widthHeight
    ? { height: widthHeight, width: widthHeight }
    : undefined
  return (
    <Avatar src={profilePicture || undefined} style={style}>
      {getInitialsFromName(name)}
    </Avatar>
  )
}

export default UserAvatar
