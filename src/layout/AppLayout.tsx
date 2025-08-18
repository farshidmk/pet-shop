import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <Box
      sx={{
        maxWidth: (t) => t.breakpoints.values.md,
        m: "auto",
        height: "100dvh",
        width: "100%",
      }}
    >
      <CssBaseline />
      <Outlet />
    </Box>
  );
};

export default AppLayout;
