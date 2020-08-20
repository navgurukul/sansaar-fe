import React from "react"
import _ from "underscore"
import classNames from "classnames"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import { compose } from "recompose"
import { withRouter } from "react-router"
import { Link } from "react-router-dom"
import {
  Box,
  Drawer,
  withStyles,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Hidden,
} from "@material-ui/core"
import withUserContext from "../../../../providers/UserAuth/withUserContext"
import drawerItems from "./items"

const drawerWidth = 300
const styles = theme => ({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: theme.zIndex.drawer,
  },
  nestedListItem: {
    paddingLeft: theme.spacing(4),
  },
  toolbar: theme.mixins.toolbar,
})

const NGDrawer = ({
  classes,
  location,
  open,
  toggleDrawer,
  userContext,
  // currentPath,
}) => {
  const { user: currentUser } = userContext
  const [listItemsOpenState, setListItemsCollapsed] = React.useState(
    _.object(drawerItems.map(i => i.text))
  )
  const toggleListItem = text => {
    const state = {
      ...listItemsOpenState,
      [text]: !listItemsOpenState[text],
    }
    setListItemsCollapsed(state)
  }

  const renderDrawerItem = (item, nested = false) => {
    let itemsVisiblityCondition = currentUser
      ? currentUser.rolesList.map(role => item.rolesList.includes(role))
      : ""
    itemsVisiblityCondition = itemsVisiblityCondition.includes(true)
    return (
      <React.Fragment key={item.text}>
        {itemsVisiblityCondition ? (
          <ListItem
            button
            component={!item.children ? Link : null}
            to={item.url}
            onClick={
              item.children ? () => toggleListItem(item.text) : toggleDrawer
            }
            selected={location.pathname.includes(item.url)}
            className={classNames({
              [classes.nestedListItem]: nested,
            })}
            
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
            {item.children &&
              (listItemsOpenState[item.text] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              ))}
          </ListItem>
        ) : (
          ""
        )}
        {item.dividerBelow && <Divider />}
        {item.children && (
          <Collapse
            in={listItemsOpenState[item.text]}
            timeout="auto"
            unmountOnExit
          >
            <List disablePadding>
              {item.children.map(childItem =>
                renderDrawerItem(childItem, true)
              )}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    )
  }

  const drawerContent = (
    <React.Fragment>
      <Box className={classes.toolbar} />
      <Divider />
      <List>{drawerItems.map(item => renderDrawerItem(item))}</List>
    </React.Fragment>
  )

  const container =
    window !== undefined ? () => window.document.body : undefined

  return (
    <React.Fragment>
      <nav className={classes.drawer}>
        <Hidden smDown>
          <Drawer
            className={classes.drawerWidth}
            variant="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={open}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          <Drawer
            container={container}
            variant="temporary"
            open={open}
            onClose={toggleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  )
}



export default compose(
  withUserContext,
  withRouter,
  withStyles(styles, { withTheme: true }),
)(NGDrawer)
