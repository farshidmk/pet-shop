import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import AppNavbar from 'src/layout/navbar/AppNavbar';
import { PetGender, type Pet } from './pet.types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { blue, purple } from '@mui/material/colors';

const CreatePetPage = () => {
  const { mutate } = useMutation({});
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<Pet>({
    resolver: yupResolver(petFormSchema),
    defaultValues: {},
  });
  const onSubmitHandler = (value: Pet) => {};
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <AppNavbar pageName="Add Pet" backUrl="/profile" />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
      >
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
                <MenuItem value="male">
                  Male <MaleIcon sx={{ color: blue[500] }} />
                </MenuItem>
                <MenuItem value="female">
                  Female <FemaleIcon sx={{ color: purple[500] }} />
                </MenuItem>
              </Select>
            )}
          />
          {errors.gender && <Box sx={{ color: 'error.main', fontSize: 12, mt: 0.5 }}>{errors.gender.message}</Box>}
        </FormControl>
      </Box>
    </Box>
  );
};

export default CreatePetPage;

const PETS_INFO: Array<keyof Pet> = ['name', 'species', 'breed', 'color', 'age'];

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
