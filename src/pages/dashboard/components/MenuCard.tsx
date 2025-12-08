import { Box, Typography } from '@mui/material';

import grooming from '@assets/images/grooming.png';
import veterinary from '@assets/images/veterinary.png';
import foods from '@assets/images/foods.png';
import more from '@assets/images/more.png';

type MenuCardProps = {
  imageUrl: string;
  title: string;
};

const MenuCard = ({ imageUrl, title }: MenuCardProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '40%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F3F0E6',
          borderRadius: 3,
          p: 2,
          // width: '50%',
        }}
      >
        <Box component="img" src={imageUrl} sx={{ width: '40%', height: 'auto' }} />
      </Box>
      <Typography variant="body2" fontWeight={'400'} fontSize={14} textAlign={'center'}>
        {title}
      </Typography>
    </Box>
  );
};

export default MenuCard;

export const DASHBOARD_MENUS: MenuCardProps[] = [
  {
    title: 'Grooming',
    imageUrl: grooming,
  },
  {
    title: 'Veterinary',
    imageUrl: veterinary,
  },
  {
    title: 'Foods',
    imageUrl: foods,
  },
  {
    title: 'More...',
    imageUrl: more,
  },
];
