import CssBaseline from '@material-ui/core/CssBaseline';
import { nest } from 'recompose';

import Routing from './routing';
import StoreProvider from './store';
import NGFetchProvider from './NGFetch';
import UserAuthProvider from './UserAuth';
import MuiThemeProvider from './muiTheme';

export default nest(
  CssBaseline,
  MuiThemeProvider,
  StoreProvider,
  NGFetchProvider,
  UserAuthProvider,
  Routing
);
