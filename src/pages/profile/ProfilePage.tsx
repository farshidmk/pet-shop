import { useAuth } from '@hooks/useAuth';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Person2Icon from '@mui/icons-material/Person2';
import PetsIcon from '@mui/icons-material/Pets';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router';
import AppNavbar from 'src/layout/navbar/AppNavbar';
import type { UserRole } from '../auth/signUp/signUp.types';
import petOwnerProfile from '@assets/images/petOwnerProfile.png';

const ProfilePage = () => {
  const { userInfo, logout } = useAuth();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AppNavbar pageName="Profile" backUrl="/" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <Box
          component="img"
          src={petOwnerProfile}
          sx={{ borderRadius: '50%', height: '122px', width: '122px', mb: 2 }}
        />
        <Typography variant="body1" fontWeight={800} fontSize={20} gutterBottom>
          {userInfo?.firstname} {userInfo?.lastname}
        </Typography>
        <Typography variant="body2" fontWeight={400} fontSize={14}>
          {showRole(userInfo!.role!)}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1,
          py: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'fit-content',
            boxShadow: 'black 0px 1px 4px 0px',
            borderRadius: 2,
          }}
        >
          <Link to={'edit'} style={{ textDecoration: 'none' }}>
            <ProfileMenuItem icon={<Person2Icon color="primary" />} title="Edit Profile" />
          </Link>
          <Link to={'pets'} style={{ textDecoration: 'none' }}>
            <ProfileMenuItem icon={<PetsIcon color="primary" />} title="Manage Pets" />
          </Link>
          <Link to={'Notifications'} style={{ textDecoration: 'none' }}>
            <ProfileMenuItem icon={<NotificationsIcon color="primary" />} title="Notifications" />
          </Link>
          <ProfileMenuItem icon={<PowerSettingsNewIcon color="primary" />} title="Log Out" onClick={logout} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

function showRole(role: UserRole) {
  switch (role) {
    case 'pet_owner':
      return 'Pet Owner';
    case 'walker_keeper':
      return 'Walker Keeper';
    case 'veterinarian':
      return 'Veterinarian';
    case 'lost_found_user':
      return 'Lost & Found User';

    default:
      return role;
  }
}

type ProfileMenuItemProps = {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
};
const ProfileMenuItem = ({ icon, title, onClick = undefined }: ProfileMenuItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'black',
        p: 2,
        cursor: 'pointer',
      }}
      component="div"
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {icon}
        <Typography variant="body2" fontSize={20}>
          {title}{' '}
        </Typography>
      </Box>
      <ChevronRightIcon />
    </Box>
  );
};
