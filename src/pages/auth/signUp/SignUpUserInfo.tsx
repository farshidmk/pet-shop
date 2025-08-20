import { Box, Button, TextField, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import type { SignUpItems } from './signUp.types';

const SignUpUserInfo = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SignUpItems>({
    // resolver: yupResolver(loginValidation),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
    },
  });

  const onSubmitHandler = (data: SignUpItems) => {
    console.log({ data });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: (t) => t.palette.common.white,
        px: 6,
      }}
    >
      <Box sx={{ flex: 1 }} />
      <Box
        component="div"
        sx={{
          background: '#ADD4DE',
          borderRadius: 10,
          width: 101,
          height: 101,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box component="img" src="/assets/images/logo.png" sx={{ height: 80, width: 80 }} />
      </Box>

      <Typography variant="body2" color="textSecondary" fontSize={12}>
        Enter you email and password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}
      >
        <TextField
          label="First name"
          {...register('firstName')}
          error={Boolean(errors.firstName?.message)}
          helperText={errors.firstName?.message}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Last name"
          {...register('lastName')}
          error={Boolean(errors.lastName?.message)}
          helperText={errors.lastName?.message}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Phone number"
          {...register('phone')}
          error={Boolean(errors.phone?.message)}
          helperText={errors.phone?.message}
          variant="outlined"
          type="tel"
          fullWidth
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2, borderRadius: 5, height: '62px' }}
            color="primary"
            size="large"
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpUserInfo;
