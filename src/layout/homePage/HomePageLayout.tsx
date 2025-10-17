import { Box } from '@mui/material';
import React from 'react';
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
      }}
    >
      <HomeNavbar />
      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Box>
  );
};

export default HomePageLayout;
