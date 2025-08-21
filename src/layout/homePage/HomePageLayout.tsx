import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import Person2Icon from '@mui/icons-material/Person2';
import { alpha, Box } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router';
import HomeNavbar from './HomeNavbar';

type Props = {
  children: React.ReactNode;
};

const HomePageLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        p: 4,
      }}
    >
      <HomeNavbar />
      <Box sx={{ flex: 1, overflow: 'auto', mb: 15 }}>{children}</Box>
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
    </Box>
  );
};

export default HomePageLayout;

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
