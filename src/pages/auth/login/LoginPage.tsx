import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@mui/material';

import { type MutationFunction, useMutation } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import type { LoginResponse, ServerCallType } from '../../../types/auth';
import { api } from '../../../services/api';
import PetTextInput from '../../../components/petTextInput/PetTextInput';

const Login = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const { storeUserInfo } = useAuth();

  const { mutate, isPending, error } = useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError,
    ServerCallType<LoginItems>
  >({
    // mutationFn: loginRequest,
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginItems>({
    resolver: yupResolver(loginValidation),
    defaultValues: {
      password: '',
      email: '',
    },
  });

  const onSubmitHandler = (data: LoginItems) => {
    mutate(
      {
        method: 'post',
        entity: 'Login',
        data,
      },
      {
        onSuccess: (res) => {
          storeUserInfo(res.data.token, res.data.user);
          navigate('/auth/welcome');
        },
      }
    );
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
      }}
    >
      <Typography variant="h2" fontWeight={600} fontSize={36} color="primary" sx={{ mb: 8 }}>
        Pet Shop
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}
      >
        <PetTextInput icon={<MailOutlineIcon />}>
          <TextField
            label="Email"
            {...register('email')}
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            variant="standard"
            InputProps={{ disableUnderline: true }}
          />
        </PetTextInput>
        <TextField
          label="Password"
          {...register('password')}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type={showPass ? 'text' : 'password'}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass((p) => !p)}>
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Alert variant="outlined" severity="error" sx={{ opacity: error ? 1 : 0, transition: 'all 0.2s linear' }}>
          {error?.response?.data?.error || 'Can not connect to server!'}
        </Alert>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 1 }} disabled={isPending}>
            {isPending && <CircularProgress sx={{ mx: 1 }} size={20} />}
            login
          </Button>
          <Link to="/auth/sign-up" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="textPrimary" fontWeight={'600'}>
              Create new user
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

const loginRequest: MutationFunction<AxiosResponse<LoginResponse>, ServerCallType<LoginItems>> = async ({
  data,
  entity,
}) => {
  return api.post(entity, data);
};

type LoginItems = {
  email: string;
  password: string;
};

const loginValidation = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
});
