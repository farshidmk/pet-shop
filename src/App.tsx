import { createTheme, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import routes from './routes';
import AuthProvider from './providers/AuthProvider';
import { SnackbarProvider } from './providers/SnackbarProvider';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    caption: {
      color: '#96969F',
      fontSize: 10,
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: '#0C4E5A',
    },
    secondary: {
      main: '#FDB429',
    },
    background: {
      default: '#8A8A8A',
      paper: '#F5F5F5',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // Change this value to whatever you want
        },
        input: {
          borderRadius: '20px', // Optional: affects the inner input field
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // Set your desired border radius here
        },
      },
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <RouterProvider router={routes} />
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
