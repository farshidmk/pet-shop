import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import AppBottomNavigation from './AppBottomNavigation';
// import Navbar from './Navbar';

const MainLayout = () => {
  const { isUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate(`/auth/login`);
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        position: 'relative',
        height: '100dvh',
        width: '100%',
        background: (t) => t.palette.background.paper,
        // p: 2,
      }}
    >
      {/* <Navbar /> */}
      <Box sx={{ flex: 1, overflow: 'auto', pt: 3, px: 3, mb: 15 }}>
        <Outlet />
        <AppBottomNavigation />
      </Box>
    </Box>
  );
};

export default MainLayout;
