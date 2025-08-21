import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <Box
      sx={{ width: '100%', borderRadius: 4, bgcolor: '#F3F0E6', display: 'flex', gap: 1, p: 2, alignItems: 'center' }}
    >
      <SearchIcon />
      <TextField
        variant="standard"
        fullWidth
        slotProps={{
          input: {
            disableUnderline: true,
          },
        }}
        sx={{ flex: 1 }}
        placeholder="Search here!"
      />
    </Box>
  );
};

export default SearchBar;
