import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { getNow } from '@services/time';
import { useMutation } from '@tanstack/react-query';
import type { ServerCallType } from 'src/types/auth';
import L from 'leaflet';
import { useForm } from 'react-hook-form';
import type { FoundPet } from './founder.types';
import { useSnackbar } from '@hooks/useSnackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { foundPetSchema } from './found.validation';

type Props = {
  open: boolean;
  handleClose: () => void;
  position: L.LatLng;
};

const FoundPetInfoModal = ({ open, handleClose, position }: Props) => {
  const snackbar = useSnackbar();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FoundPet>({
    resolver: yupResolver(foundPetSchema),
    defaultValues: {
      found_date: getNow(),
      latitude: 0,
      longitude: 0,
    },
  });

  const { mutate } = useMutation<FoundPet, Error, ServerCallType<FoundPet>>({});

  const onSubmitHandler = (values: FoundPet) => {
    const data: FoundPet = {
      ...values,
      latitude: position.lat,
      longitude: position.lng,
    };
    mutate(
      {
        method: 'post',
        entity: 'found-reports',
        data,
      },
      {
        onSuccess: () => {
          snackbar('Thank you. The pet information is Saved', 'success');
        },
        onError: () => {
          snackbar('Error on saving pet information.', 'error');
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
          {ITEMS.map((item) => (
            <TextField
              key={item.name}
              label={item.label}
              {...register(item.name)}
              error={Boolean(errors[item.name]?.message)}
              helperText={errors[item.name]?.message}
              variant="outlined"
              fullWidth
            />
          ))}
          <TextField
            label="Last seen date"
            {...register('found_date')}
            error={Boolean(errors.found_date?.message)}
            helperText={errors.found_date?.message}
            variant="outlined"
            fullWidth
            type="date"
          />

          <TextField
            label="Condition"
            {...register('condition_description')}
            error={Boolean(errors.condition_description?.message)}
            helperText={errors.condition_description?.message}
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

export default FoundPetInfoModal;

const ITEMS: { name: keyof FoundPet; label: string }[] = [
  {
    name: 'species',
    label: 'Species',
  },
  {
    name: 'breed',
    label: 'Breed',
  },
  {
    name: 'color',
    label: 'Color',
  },
  {
    name: 'found_address',
    label: 'Found Address',
  },
  {
    name: 'contact_phone',
    label: 'Contact Phone',
  },
];
