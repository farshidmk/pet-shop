import { QueryClient, useMutation } from '@tanstack/react-query';
import type { ServerCallType } from 'src/types/auth';
import type { PetLost } from '../pet.types';
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import L from 'leaflet';
import { useNavigate } from 'react-router';
import { getNow } from '@services/time';

type Props = {
  open: boolean;
  handleClose: () => void;
  petId: number;
  position: L.LatLng;
};

const LostPetInfoModal = ({ open, petId, handleClose, position }: Props) => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<PetLost>({
    // resolver: yupResolver(loginValidation),
    defaultValues: {
      last_seen_date: getNow(),
    },
  });

  const { mutate } = useMutation<PetLost, Error, ServerCallType<PetLost>>({});

  const onSubmitHandler = (values: PetLost) => {
    const data: PetLost = {
      ...values,
      pet_id: petId,
      is_urgent: true,
      latitude: position.lat,
      longitude: position.lng,
    };
    mutate(
      {
        method: 'post',
        entity: 'lost-reports',
        data,
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries({ queryKey: ['pets'] });
          navigate('/profile/pets');
        },
      }
    );
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Fill this Information</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}
        >
          <TextField
            label="Last seen date"
            {...register('last_seen_date')}
            error={Boolean(errors.last_seen_date?.message)}
            helperText={errors.last_seen_date?.message}
            variant="outlined"
            fullWidth
            type="date"
          />
          <TextField
            label="Last seen address"
            {...register('last_seen_address')}
            error={Boolean(errors.last_seen_address?.message)}
            helperText={errors.last_seen_address?.message}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Circumstances"
            {...register('circumstances')}
            error={Boolean(errors.circumstances?.message)}
            helperText={errors.circumstances?.message}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
          />

          <Button type="submit" color="success" variant="outlined">
            Accept
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LostPetInfoModal;
