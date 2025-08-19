import { Box } from '@mui/material';
import React from 'react';

type Props = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

const PetTextInput = ({ icon, children }: Props) => {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        gap: 0,
        border: (t) => `1px solid ${t.palette.common.black}`,
        borderRadius: 4,
        height: '74px',
      }}
    >
      <Box
        sx={{
          width: '74px',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRight: (t) => `1px solid ${t.palette.common.black}`,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{children}</Box>
    </Box>
  );
};

export default PetTextInput;
