import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import PetTextInput from '../../../components/petTextInput/PetTextInput';
import { useAuth } from '../../../hooks/useAuth';
import PetEmailIcon from '../../../icons/PetEmailIcon';
import PetPasswordIcon from '../../../icons/PetPasswordIcon';
import type { SignUpItems } from './signUp.types';

const SignUpUserInfo = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const { storeUserInfo } = useAuth();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SignUpItems>({
    // resolver: yupResolver(loginValidation),
    defaultValues: {
      password: '',
      email: '',
    },
  });

  const onSubmitHandler = (data: SignUpItems) => {};

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
      <Typography variant="h6" fontWeight={600}>
        Login
      </Typography>
      <Typography variant="body2" color="textSecondary" fontSize={12}>
        Enter you email and password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}
      >
        <PetTextInput icon={<PetEmailIcon />}>
          <TextField
            label="Email or Username"
            {...register('email')}
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            variant="standard"
            fullWidth
            InputProps={{ disableUnderline: true }}
          />
        </PetTextInput>
        <PetTextInput icon={<PetPasswordIcon />}>
          <TextField
            label="Password"
            {...register('password')}
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            type={showPass ? 'text' : 'password'}
            variant="standard"
            fullWidth
            slotProps={{
              input: {
                disableUnderline: true,
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
        </PetTextInput>

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
            // disabled={isPending}
            color="primary"
            size="large"
          >
            {/* {isPending && <CircularProgress sx={{ mx: 1 }} size={20} />} */}
            Sign In
          </Button>
          <Typography variant="body2" sx={{ display: 'flex', gap: 0.5 }}>
            Don't have account?
            <Link to="/auth/sign-up" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="secondary" fontWeight={'600'}>
                Create One
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flex: 1 }} />
      <Box
        component="img"
        src="/assets/images/lonely-dog.png"
        sx={{
          height: '20vh',
          width: 'auto',
          maxHeight: '200px',
        }}
      />
    </Box>
  );
};

export default SignUpUserInfo;
