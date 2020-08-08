import React from 'react';
import NGAppBar from './components/NGAppBar';
import NGDrawer from './components/Drawer';

const HeaderWithDrawer = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <React.Fragment>
      <NGAppBar toggleDrawer={toggleDrawer} />
      <NGDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
    </React.Fragment>
  );
}



export default HeaderWithDrawer;