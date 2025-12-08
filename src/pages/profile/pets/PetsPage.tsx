import StatusHandler from '@components/statusHandler/StatusHandler';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CakeIcon from '@mui/icons-material/Cake';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Box, Button, Chip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { blue, orange, purple } from '@mui/material/colors';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import AppNavbar from 'src/layout/navbar/AppNavbar';
import { PetGender, type Pet } from './pet.types';
import lonelyDog from '@assets/images/lonely-dog.png';

const PetsPage = () => {
  const navigate = useNavigate();
  const { data, status, refetch } = useQuery<{ pets: Pet[]; success: boolean }, Error, Pet[]>({
    queryKey: ['pets'],

    select: (res) => res.pets,
  });

  return (
    <StatusHandler status={status} refetch={refetch} skeletonHeight={400}>
      <AppNavbar pageName="Pets Management" backUrl="/profile" />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto' }}>
        <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
          Pets
        </Typography>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'auto', p: 1 }}>
          {data?.map((pet) => {
            return <PetCard key={pet.pet_id} petInfo={pet} />;
          })}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              endIcon={<AddCircleIcon />}
              variant="contained"
              onClick={() => navigate('new')}
              sx={{ mt: 2, maxWidth: '300px' }}
              fullWidth
            >
              Add New PET
            </Button>
          </Box>
        </Box>
      </Box>
    </StatusHandler>
  );
};

export default PetsPage;

type PetCardProps = {
  petInfo: Pet;
};
const PetCard = ({ petInfo }: PetCardProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { age, breed, gender, name, species, pet_id, is_missing, primaryImage } = petInfo;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderRadius: 3,
        boxShadow: 2,
        p: 1.5,
        background: is_missing ? orange[200] : 'paper.default',
        border: is_missing ? `1px solid ${orange[700]}` : 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 4,
        },
      }}
    >
      <Box
        component="img"
        src={primaryImage?.image_url ?? { lonelyDog }}
        alt={name}
        sx={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'fill' }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {gender === PetGender.Male ? (
            <MaleIcon sx={{ color: blue[700] }} />
          ) : (
            <FemaleIcon sx={{ color: purple[400] }} />
          )}
          <Typography variant="h6">{name}</Typography>

          <Chip
            label={`${age}${isSmallScreen ? '' : ' year' + (age > 1 ? 's' : '')}`}
            color="info"
            size="small"
            icon={<CakeIcon />}
            variant="outlined"
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body1" fontWeight={600} color="text.primary">
            {species}
          </Typography>
          <Typography variant="body1">-</Typography>
          <Typography variant="body2" color="text.secondary">
            {breed}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
        {is_missing ? (
          <Typography variant="body2" color="error" fontSize={12}>
            Missed 😭
          </Typography>
        ) : (
          <Button variant="contained" color="secondary" onClick={() => navigate(`${pet_id}/lost`)}>
            LOST
          </Button>
        )}
      </Box>
    </Box>
  );
};
