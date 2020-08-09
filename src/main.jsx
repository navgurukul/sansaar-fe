import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// Render the React application to the DOM
const theme = createMuiTheme();
ReactDOM.render(<ThemeProvider theme={theme}><Root /></ThemeProvider>, document.getElementById('app-container'));
