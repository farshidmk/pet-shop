import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import Person2Icon from '@mui/icons-material/Person2';
import { alpha, Box } from '@mui/material';
import { NavLink } from 'react-router';

const AppBottomNavigation = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        bottom: '20px',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        boxShadow: (t) => `0px 0px 4px 1px ${alpha(t.palette.common.black, 0.1)}`,
        borderRadius: 6,
        py: 1,
        px: 1.5,
      }}
    >
      {LINKS.map((link) => (
        <NavLink to={link.to}>
          {({ isActive }) => (
            <Box
              sx={{
                background: (t) => (isActive ? t.palette.primary.main : 'none'),
                color: (t) => (isActive ? t.palette.common.white : t.palette.common.black),
                borderRadius: '30px',
                width: '60px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {link.icon}
            </Box>
          )}
        </NavLink>
      ))}
    </Box>
  );
};

export default AppBottomNavigation;

const LINKS = [
  {
    to: '/',
    icon: <HomeIcon />,
  },
  {
    to: '/search',
    icon: <LanguageIcon />,
  },
  {
    to: '/chat',
    icon: <ChatIcon />,
  },
  {
    to: '/profile',
    icon: <Person2Icon />,
  },
];
