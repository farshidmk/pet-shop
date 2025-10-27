import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import type { SearchPetInfo } from './search.types';

type Props = {
  open: boolean;
  handleClose: () => void;
  searchInfo: SearchPetInfo;
};

const SearchDetailModal = ({ open, handleClose, searchInfo }: Props) => {
  const { breed, species, primary_image_url, contact_phone, condition_description, color, found_date, finder } =
    searchInfo;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {primary_image_url && (
            <Box
              component="img"
              src={primary_image_url}
              sx={{ borderRadius: '50%', objectFit: 'fill', height: '100px', width: '100px', mb: 1 }}
            />
          )}

          <Typography variant="body1" fontWeight={600}>
            {species.toUpperCase()}
          </Typography>
          <Typography variant="body2">
            {breed} - {color}
          </Typography>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            color="primary"
            onClick={() => (window.location.href = `mailto:${finder.email}`)}
            aria-label="send email"
            sx={{ fontSize: 24 }}
          >
            <EmailIcon />
          </IconButton>
          <Typography variant="body2" fontWeight={600}>
            Contact Email:
          </Typography>
          <Typography variant="body2">{finder.email}</Typography>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            color="success"
            onClick={() => (window.location.href = `tel:${contact_phone}`)}
            aria-label="call"
            sx={{ fontSize: 24 }}
          >
            <PhoneIcon />
          </IconButton>
          <Typography variant="body2" fontWeight={600}>
            Contact Phone:
          </Typography>
          <Typography variant="body2">{contact_phone}</Typography>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarMonthIcon sx={{ m: 1 }} />
          <Typography variant="body2" fontWeight={600}>
            Found Date:
          </Typography>
          <Typography variant="body2">{new Date(found_date).toLocaleDateString()}</Typography>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
          <DescriptionIcon sx={{ m: 1 }} />
          <Typography variant="body2" fontWeight={600}>
            Condition:
          </Typography>
          <Typography variant="body2">{condition_description}</Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            endIcon={<EmailIcon />}
            onClick={() => (window.location.href = `mailto:${finder.email}`)}
            fullWidth
            sx={{ maxWidth: '100px' }}
            color="primary"
          >
            EMAIL
          </Button>
          <Button
            variant="contained"
            endIcon={<PhoneIcon />}
            onClick={() => (window.location.href = `tel:${contact_phone}`)}
            fullWidth
            sx={{ maxWidth: '100px' }}
            color="secondary"
          >
            Call
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default SearchDetailModal;
