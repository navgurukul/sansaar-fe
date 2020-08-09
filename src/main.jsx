import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Root from './Root';
// Render the React application to the DOM
const theme = createMuiTheme();
ReactDOM.render(<ThemeProvider theme={theme}><Root /></ThemeProvider>, document.getElementById('app-container'));
