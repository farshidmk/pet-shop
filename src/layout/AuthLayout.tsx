import { Box } from '@mui/material';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
