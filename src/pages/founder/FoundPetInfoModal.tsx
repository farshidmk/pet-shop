import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { getNow } from '@services/time';
import { useMutation } from '@tanstack/react-query';
import type { ServerCallType } from 'src/types/auth';
import L from 'leaflet';
import { useForm } from 'react-hook-form';
import type { FoundPet, FoundPetResponse } from './founder.types';
import { useSnackbar } from '@hooks/useSnackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { foundPetSchema } from './found.validation';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import UploadPetImage from '../profile/pets/UploadPetImage';

type Props = {
  open: boolean;
  handleClose: () => void;
  position: L.LatLng;
};

const FoundPetInfoModal = ({ open, handleClose, position }: Props) => {
  const snackbar = useSnackbar();
  const { token } = useAuth();
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

  const [file, setFile] = useState<File | null>(null);

  const { mutateAsync, isPending } = useMutation<FoundPetResponse, Error, ServerCallType<FoundPet>>({});
  const { mutateAsync: petPhotoMutateAsync, isPending: petPhotoIsPending } = useMutation<
    FoundPetResponse,
    Error,
    ServerCallType<FormData>
  >({});

  const onSubmitHandler = async (values: FoundPet) => {
    const data: FoundPet = {
      ...values,
      latitude: position.lat,
      longitude: position.lng,
    };
    try {
      const petInfo = await mutateAsync(
        {
          method: 'post',
          entity: 'found-reports',
          data,
        },
        {
          onSuccess: () => {},
          onError: () => {},
        }
      );

      if (!petInfo.success) {
        throw new Error(petInfo.message);
      }
      if (file) {
        const formData = new FormData();
        formData.append('images', file);
        await petPhotoMutateAsync(
          {
            entity: `images/found-reports/${petInfo.reportId}/upload`,
            method: 'post',
            data: formData,
            headers: {
              'Content-Type': 'form-data',
              Authorization: 'Bearer ' + token,
            },
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
      }
    } catch (error) {
      console.log(error);
      snackbar('Error on saving pet information.', 'error');
    }
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Fill this Information</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 1 }}>
          <Grid container spacing={1.5}>
            {ITEMS.map((item, i) => (
              <Grid size={{ xs: 12, sm: i < 4 ? 6 : 12 }} key={item.name}>
                <TextField
                  label={item.label}
                  {...register(item.name)}
                  error={Boolean(errors[item.name]?.message)}
                  helperText={errors[item.name]?.message}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            ))}
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Last seen date"
                {...register('found_date')}
                error={Boolean(errors.found_date?.message)}
                helperText={errors.found_date?.message}
                variant="outlined"
                fullWidth
                type="date"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Condition"
                {...register('condition_description')}
                error={Boolean(errors.condition_description?.message)}
                helperText={errors.condition_description?.message}
                variant="outlined"
                fullWidth
                multiline
                rows={1}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <UploadPetImage setFile={setFile} isFounder />
            </Grid>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              color="success"
              variant="outlined"
              fullWidth
              loading={isPending || petPhotoIsPending}
              disabled={!file}
            >
              submit
            </Button>
          </Grid>
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
