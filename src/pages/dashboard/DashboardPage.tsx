import { Box, Button, Grid, Typography } from '@mui/material';
import HomePageLayout from 'src/layout/homePage/HomePageLayout';
import SearchBar from './components/SearchBar';
import MenuCard, { DASHBOARD_MENUS } from './components/MenuCard';

const DashboardPage = () => {
  return (
    <HomePageLayout>
      <Box component="main" sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto' }}>
        <SearchBar />

        <Box
          sx={{
            bgcolor: '#0C4E5A',
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'space-around',
            my: 3,
            alignItems: 'end',
            px: 2,
          }}
        >
          <Box sx={{ px: 3, py: 2, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'start' }}>
            <Typography variant="h6" fontWeight={600} fontSize={22} sx={{ color: (t) => t.palette.common.white }}>
              Healthy Pet, Happy Life
            </Typography>
            <Button variant="contained" color="secondary" sx={{ borderRadius: 4 }}>
              Reminder
            </Button>
          </Box>
          <Box component="img" src="assets/images/cat_dog.png" sx={{ width: '130px', height: '130px' }} />
        </Box>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            {DASHBOARD_MENUS.map((menu) => (
              <MenuCard key={menu.title} {...menu} />
            ))}
          </Box>
        </Box>
      </Box>
    </HomePageLayout>
  );
};

export default DashboardPage;
