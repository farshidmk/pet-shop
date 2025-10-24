import { useAuth } from '@hooks/useAuth';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Box, Button, IconButton, Typography } from '@mui/material';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LocationMarker } from '../profile/pets/lost/LostPetPage';
import FoundPetInfoModal from './FoundPetInfoModal';
import { useNavigate } from 'react-router';
import { Roles } from '../auth/signUp/signUp.types';

const FounderPage = () => {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { isUserLoggedIn, userInfo, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate(`/auth/login`);
    }
    if (userInfo?.role !== Roles.LostFoundUser) {
      navigate(`/`);
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          position: 'relative',
          height: '100dvh',
          width: '100%',
          background: (t) => t.palette.background.paper,
          p: 2,
        }}
      >
        <Box sx={{ width: '100%' }}>
          <IconButton
            color="warning"
            onClick={() => {
              logout();
              navigate('/auth/login');
            }}
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Box>
        <Typography variant="h6" textAlign={'center'}>
          Where did you found the pet?
        </Typography>
        <Box sx={{ flex: 1, width: '100%' }}>
          <MapContainer
            center={[51.505, -0.09]} // default center
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ maxWidth: '300px' }}
            disabled={!position}
            onClick={() => setShowModal(true)}
          >
            I found here
          </Button>
        </Box>
      </Box>
      <FoundPetInfoModal open={showModal} handleClose={() => setShowModal(false)} position={position!} />
    </>
  );
};

export default FounderPage;
