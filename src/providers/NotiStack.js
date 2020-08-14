import React from 'react';

import { SnackbarProvider } from 'notistack';

const NotiStackProvider = ({ children }) => (
  <SnackbarProvider maxSnack={3}>
    {children}
  </SnackbarProvider>
);

export default NotiStackProvider;