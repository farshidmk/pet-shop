import { useAuth } from '@hooks/useAuth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Badge, Box, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router';

const HomeNavbar = () => {
  const { userInfo } = useAuth();

  return (
    <>
      <Box component="nav" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link to={'/profile'}>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </Link>
          <Typography variant="body1">Hi, {userInfo?.firstname}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton sx={{ p: 1.2, border: (t) => `1px solid ${t.palette.common.black}` }}>
            <Badge color="secondary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton sx={{ p: 1.2, border: (t) => `1px solid ${t.palette.common.black}` }}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default HomeNavbar;
