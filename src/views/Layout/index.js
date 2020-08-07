import React from 'react';
import HeaderBar from '../../components/HeaderBar';
import NGDrawer from './components/drawer';

const LayoutPage = () => {

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <React.Fragment>
      <HeaderBar toggleDrawer={toggleDrawer} />
      <NGDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
    </React.Fragment>
  );
}

export default LayoutPage;