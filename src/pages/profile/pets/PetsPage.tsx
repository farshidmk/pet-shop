import { Box, Button, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { ApiCallResponse } from '@types/server';
import { PetGender, type Pet } from './pet.types';
import StatusHandler from '@components/statusHandler/StatusHandler';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AppNavbar from 'src/layout/navbar/AppNavbar';

type PetWithId = { id: number } & Pet;
const PetsPage = () => {
  const { data, status, refetch } = useQuery<ApiCallResponse<PetWithId[]>, Error, PetWithId[]>({
    queryKey: ['pets'],

    select: (res) => res.data,
  });

  return (
    <StatusHandler status={status} refetch={refetch} skeletonHeight={400}>
      <AppNavbar pageName="Pets Management" backUrl="/profile" />
      <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
        Pets
      </Typography>
      {data?.map((pet) => {
        const { id, ...rest } = pet;
        return <PetCard key={id} petInfo={rest} />;
      })}
      <Button endIcon={<AddCircleIcon />} variant="contained">
        Add New PET
      </Button>
    </StatusHandler>
  );
};

export default PetsPage;

type PetCardProps = {
  petInfo: Pet;
};
const PetCard = ({ petInfo }: PetCardProps) => {
  const { age, breed, color, gender, name, species } = petInfo;
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 4,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 8,
        },
      }}
    >
      {/* Optional: Placeholder image (or add pet.photo in future) */}
      <CardMedia component="img" height="180" image={`/assets/images/lonely-dog.png`} alt={name} />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Species: <strong>{species}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Breed: {breed}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Color: {color}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {age} year{age > 1 ? 's' : ''}
        </Typography>
        <Box mt={1}>
          <Chip
            label={gender === PetGender.Male ? 'Male' : 'Female'}
            color={gender === PetGender.Male ? 'primary' : 'secondary'}
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};
