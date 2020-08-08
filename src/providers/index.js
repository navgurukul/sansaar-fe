import CssBaseline from '@material-ui/core/CssBaseline';
import { nest } from 'recompose';

import Routing from './routing';
import StoreProvider from './store';
import NGFetchProvider from './NGFetch';
import UserAuthProvider from './UserAuth';

export default nest(
  CssBaseline,
  StoreProvider,
  NGFetchProvider,
  UserAuthProvider,
  Routing
);
