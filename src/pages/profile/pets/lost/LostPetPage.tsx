import GetLocation from '@components/map/GetLocation';
import StatusHandler from '@components/statusHandler/StatusHandler';
import { Box, Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import L from 'leaflet';
import { useState } from 'react';
import { useParams } from 'react-router';
import AppNavbar from 'src/layout/navbar/AppNavbar';
import type { Pet } from '../pet.types';
import LostPetInfoModal from './LostPetInfoModal';

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
            <GetLocation position={position} setPosition={setPosition} />
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
