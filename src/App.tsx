import { createTheme, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import AuthProvider from "./providers/AuthProvider";
import { SnackbarProvider } from "./providers/SnackbarContext";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    caption: {
      color: "#96969F",
      fontSize: 10,
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: "#B22222",
    },
    secondary: {
      main: "#1A1A2E",
    },
    background: {
      default: "#8A8A8A",
      paper: "#F5F5F5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
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
