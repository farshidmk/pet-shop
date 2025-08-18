import React from 'react';
import { snackbarContext, type TSnackbar } from '../providers/SnackbarProvider';

export function useSnackbar(): TSnackbar {
  const context = React.useContext(snackbarContext);
  if (context === undefined) {
    throw new Error(`useSnackbar must be used within a Provider`);
  }
  return context;
}
