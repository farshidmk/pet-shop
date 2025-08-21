import { Box, Typography } from '@mui/material';

type MenuCardProps = {
  imageUrl: string;
  title: string;
};

const MenuCard = ({ imageUrl, title }: MenuCardProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F3F0E6',
          borderRadius: 3,
          p: 2,
        }}
      >
        <Box component="img" src={imageUrl} sx={{ width: '50px', height: '50px' }} />
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
    imageUrl: '/assets/images/grooming.png',
  },
  {
    title: 'Veterinary',
    imageUrl: '/assets/images/veterinary.png',
  },
  {
    title: 'Foods',
    imageUrl: '/assets/images/foods.png',
  },
  {
    title: 'More...',
    imageUrl: '/assets/images/more.png',
  },
];
