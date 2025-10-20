import { Box, Button, Typography } from '@mui/material';
import L from 'leaflet';
import { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { useParams } from 'react-router';
import AppNavbar from 'src/layout/navbar/AppNavbar';
import LostPetInfoModal from './LostPetInfoModal';
import { useQuery } from '@tanstack/react-query';
import type { Pet } from '../pet.types';
import StatusHandler from '@components/statusHandler/StatusHandler';

const LostPetPage = () => {
  const { id } = useParams();
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data, status, refetch } = useQuery<{ pet: Pet }, Error, Pet>({
    queryKey: [`pets/${id}`],
    select: (res) => res.pet,
  });

  return (
    <>
      <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <AppNavbar pageName="Lost Pet" backUrl="/profile/pets" />
        <StatusHandler status={status} refetch={refetch} skeletonHeight={400}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Let's find {data?.name}
          </Typography>
          <Box sx={{ flex: 1 }}>
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
              Let's find
            </Button>
          </Box>
        </StatusHandler>
      </Box>
      <LostPetInfoModal
        open={showModal}
        handleClose={() => setShowModal(false)}
        petId={Number(id)}
        position={position!}
      />
    </>
  );
};

export default LostPetPage;

const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
});

function LocationMarker({
  position,
  setPosition,
}: {
  position: L.LatLng | null;
  setPosition: (pos: L.LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
}
