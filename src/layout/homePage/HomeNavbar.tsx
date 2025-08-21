import { useAuth } from '@hooks/useAuth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Badge, Box, Button, IconButton, Popover, Typography } from '@mui/material';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

const HomeNavbar = () => {
  const { userInfo, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Box component="nav" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            <AccountCircleIcon />
          </IconButton>
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

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ width: '150px', p: 1 }}>
          <Button size="small" variant="text" endIcon={<LogoutIcon />} onClick={logout} fullWidth>
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default HomeNavbar;
