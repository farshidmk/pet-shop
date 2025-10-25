import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import PetsIcon from '@mui/icons-material/Pets';
import { Avatar, Box, Typography } from '@mui/material';
import { blue, orange, purple } from '@mui/material/colors';
import AppNavbar from 'src/layout/navbar/AppNavbar';
import { PetGender } from '../profile/pets/pet.types';
import type { SearchPetInfo, SearchPetResult } from './search.types';

type Props = {
  result: SearchPetResult;
  handleBack: () => void;
};

const SearchResult = ({ result, handleBack }: Props) => {
  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <AppNavbar pageName="Search Result" backUrl="/" onBack={handleBack} />
      <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}>
        {result.results?.map((pet) => (
          <PetSearchCard key={pet.report_id} pet={pet} />
        ))}
      </Box>
    </Box>
  );
};

export default SearchResult;

const PetSearchCard = ({ pet }: { pet: SearchPetInfo }) => {
  const { breed, gender, species } = pet;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderRadius: 3,
        boxShadow: 2,
        p: 1.5,
        background: orange[100],
        border: `1px solid ${orange[700]}`,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 4,
        },
      }}
    >
      <Avatar>
        <PetsIcon />
      </Avatar>

      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body1" fontWeight={600} color="text.primary">
            {species}
          </Typography>
          <Typography variant="body1">-</Typography>
          <Typography variant="body2" color="text.secondary">
            {breed}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {gender === PetGender.Male ? (
            <MaleIcon sx={{ color: blue[700] }} />
          ) : (
            <FemaleIcon sx={{ color: purple[400] }} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
