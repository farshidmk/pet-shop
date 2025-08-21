import { Box, Button, CircularProgress, IconButton, TextField, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useForm } from 'react-hook-form';
import { SignUpFormSteps, type SignUpItems } from './signUp.types';
import useSignUpValues from './hooks/useSignUpValues';
import type { AxiosError } from 'axios';
import type { LoginResponse, ServerCallType } from '../../../types/auth';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@hooks/useAuth';
import { useNavigate } from 'react-router';

const SignUpUserInfo = () => {
  const navigate = useNavigate();
  const { storeUserInfo } = useAuth();
  const { mutate, isPending } = useMutation<LoginResponse, AxiosError, ServerCallType<SignUpItems>>({});
  const { signUpValues, setStep } = useSignUpValues();
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
    mutate(
      {
        data: {
          ...signUpValues,
          ...data,
        },
        method: 'post',
        entity: 'auth/register',
      },
      {
        onSuccess: ({ email, role, token, userId, firstname, lastname }) => {
          storeUserInfo(token, {
            email,
            firstname,
            lastname,
            role,
            userId,
          });
          navigate('/');
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
        px: 6,
      }}
    >
      <Box sx={{ width: '100%', mt: 2 }}>
        <IconButton color="secondary" onClick={() => setStep(SignUpFormSteps.Role)}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Box>
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

      <Typography variant="h6" color="textPrimary">
        Complete The Information
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{
          mt: 1,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            width: '100%',
            border: (t) => `1px solid ${t.palette.common.black}`,
            p: 2,
            borderRadius: 2,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
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
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            mt: 4,
          }}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2, borderRadius: 5, height: '62px' }}
            color="primary"
            size="large"
            disabled={isPending}
          >
            {isPending && <CircularProgress sx={{ mx: 1 }} size={20} />}
            Continue
          </Button>
        </Box>
      </Box>
      <Box sx={{ flex: 1 }} />
    </Box>
  );
};

export default SignUpUserInfo;
