import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  overrides: {
    MuiCardContent: {
      root: {
        "&:last-child": {
          paddingBottom: 16,
       },
      },
    },
  },
});

const MuiThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default MuiThemeProvider;