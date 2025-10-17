import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

type Props = {
  pageName: string;
  backUrl: string;
  actionButton?: React.ReactNode;
};

const AppNavbar = ({ backUrl, actionButton = null, pageName }: Props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Link to={backUrl} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ChevronLeftIcon />
        </Link>
        <Typography variant="body1">{pageName}</Typography>
      </Box>
      {actionButton}
    </Box>
  );
};

export default AppNavbar;
