import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import AppNavbar from 'src/layout/navbar/AppNavbar';
import { PetGender, type PetFormItem, type PetRegisterResponse } from './pet.types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { blue, purple } from '@mui/material/colors';
import UploadPetImage from './UploadPetImage';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from 'react';
import type { ServerCallType } from 'src/types/auth';
import { useAuth } from '@hooks/useAuth';
import { useSnackbar } from '@hooks/useSnackbar';
import { useNavigate } from 'react-router';

const CreatePetPage = () => {
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const [file, setFile] = useState<File | null>(null);

  const { mutateAsync: petInfoMutateAsync, isPending: petInfoIsPending } = useMutation<
    PetRegisterResponse,
    Error,
    ServerCallType<PetFormItem>
  >({});
  const { mutateAsync: petPhotoMutateAsync, isPending: petPhotoIsPending } = useMutation<
    PetRegisterResponse,
    Error,
    ServerCallType<FormData>
  >({});
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<PetFormItem>({
    resolver: yupResolver(petFormSchema),
    defaultValues: {},
  });
  const onSubmitHandler = async (data: PetFormItem) => {
    try {
      const petInfo = await petInfoMutateAsync(
        {
          entity: 'pets',
          method: 'post',
          data,
        },
        {
          onError: () => {
            snackbar('Failed to register your pet', 'error');
          },
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
            entity: `images/pets/${petInfo.petId}/upload`,
            method: 'post',
            data: formData,
            headers: {
              'Content-Type': 'form-data',
              Authorization: 'Bearer ' + token,
            },
          },
          {
            onSuccess: (res) => {
              if (res.success) {
                queryClient.refetchQueries({ queryKey: ['pets'] });
                snackbar('Your pet register successfully', 'success');
                navigate('/profile/pets');
              }
            },
            onError: () => {
              snackbar('Failed to register your pet', 'error');
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <AppNavbar pageName="Add Pet" backUrl="/profile" />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 1, overflow: 'auto' }}
      >
        <Typography variant="h5" fontSize={36} fontWeight={600} textAlign="center" sx={{ mt: 2, mb: 1 }}>
          Pet Information
        </Typography>
        {PETS_INFO.map((petInfo) => (
          <TextField
            label={petInfo}
            {...register(petInfo)}
            error={Boolean(errors[petInfo]?.message)}
            helperText={errors[petInfo]?.message}
            variant="outlined"
            fullWidth
          />
        ))}
        <FormControl fullWidth error={Boolean(errors.gender)}>
          <InputLabel id="pet-gender-select-label">Gender</InputLabel>
          <Controller
            name="gender"
            control={control}
            rules={{ required: 'Gender is required' }}
            render={({ field }) => (
              <Select {...field} labelId="pet-gender-select-label" label="Gender">
                <MenuItem value="male" sx={{ color: blue[600] }}>
                  <MaleIcon />
                  Male
                </MenuItem>
                <MenuItem value="female" sx={{ color: purple[500] }}>
                  <FemaleIcon />
                  Female
                </MenuItem>
              </Select>
            )}
          />
          {errors.gender && <Box sx={{ color: 'error.main', fontSize: 12, mt: 0.5 }}>{errors.gender.message}</Box>}
        </FormControl>
        <UploadPetImage setFile={setFile} />
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<CheckCircleOutlineIcon />}
            loading={petInfoIsPending || petPhotoIsPending}
            fullWidth
            sx={{ maxWidth: '400px' }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePetPage;

const PETS_INFO: Array<keyof PetFormItem> = ['name', 'species', 'breed', 'color', 'age'];

// ✅ Define Yup validation schema
const petFormSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters long'),

  species: yup.string().required('Species is required').min(2, 'Species must be at least 2 characters long'),

  breed: yup.string().required('Breed is required').min(2, 'Breed must be at least 2 characters long'),

  color: yup.string().required('Color is required').min(2, 'Color must be at least 2 characters long'),

  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be an integer'),

  gender: yup
    .mixed<PetGender>()
    .oneOf(Object.values(PetGender), 'Gender must be either male or female')
    .required('Gender is required'),
});
