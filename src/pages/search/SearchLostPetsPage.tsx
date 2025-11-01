import GetLocation from '@components/map/GetLocation';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AppNavbar from 'src/layout/navbar/AppNavbar';
import type { ServerCallType } from 'src/types/auth';
import type { SearchPet, SearchPetResult } from './search.types';
import SearchResult from './SearchResult';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const SearchLostPetsPage = () => {
  const snackbar = useSnackbar();
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const { mutate, isPending } = useMutation<SearchPetResult, Error, ServerCallType<SearchPet>>({});
  const [searchResult, setSearchResult] = useState<SearchPetResult | undefined>(undefined);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SearchPet>({
    defaultValues: {
      radius: '30',
    },
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = (values: SearchPet) => {
    const data: SearchPet = {
      ...values,
      latitude: String(position!.lat),
      longitude: String(position!.lng),
    };
    const query = new URLSearchParams(data).toString();
    mutate(
      {
        method: 'get',
        entity: `search/found-pets?${query}`,
        data,
      },
      {
        onSuccess: (res) => setSearchResult(res),
        onError: () => {
          snackbar('Error on Searching pets.', 'error');
        },
      }
    );
  };

  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {searchResult ? (
        <SearchResult result={searchResult} handleBack={() => setSearchResult(undefined)} />
      ) : (
        <>
          <AppNavbar pageName="Search Pet" backUrl="/" />
          <Typography variant="h6" textAlign="center">
            Find your Pet
          </Typography>
          <Box
            component="form"
            //@ts-ignore
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', mt: 2, gap: 1, px: 1 }}
          >
            <Box sx={{ flex: 1, minHeight: '300px', mb: 1 }}>
              <GetLocation position={position} setPosition={setPosition} />
            </Box>
            <Grid container spacing={1.5}>
              {ITEMS.map((item) => (
                <Grid size={{ xs: 12, sm: 6 }} key={item.name}>
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
            </Grid>
            <Button type="submit" variant="contained" color="primary" disabled={!position} loading={isPending}>
              Search
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SearchLostPetsPage;

const ITEMS: { name: keyof SearchPet; label: string }[] = [
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
    name: 'radius',
    label: 'radius',
  },
];

const validationSchema = Yup.object().shape({
  radius: Yup.string()
    .matches(/^[0-9]+$/, 'Only numeric characters are allowed') // Only numeric characters
    .test('is-valid-range', 'Value must be greater than 0 and less than 100', (value) => {
      const numValue = Number(value);
      return numValue > 0 && numValue < 100;
    })
    .required('This field is required'), // Make the field required
});
