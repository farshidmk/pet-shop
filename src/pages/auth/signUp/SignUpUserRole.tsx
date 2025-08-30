import { Box, Button, Checkbox, IconButton, Typography } from '@mui/material';
import { Roles, SignUpFormSteps, type UserRole } from './signUp.types';
import useSignUpValues from './hooks/useSignUpValues';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const SignUpUserRole = () => {
  const { setStep } = useSignUpValues();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        alignItems: 'center',
        justifyContent: 'center',
        background: (t) => t.palette.common.white,
        px: 6,
        overflow: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mt: 2 }}>
        <IconButton color="secondary" onClick={() => setStep(SignUpFormSteps.Email)}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h6">Choose Your Role</Typography>
        <IconButton sx={{ opacity: 0 }}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          flex: 1,
          overflow: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 1,
        }}
      >
        {ROLES.map((role) => (
          <RoleCardCheckbox key={role.value} {...role} />
        ))}
      </Box>
      <Button
        fullWidth
        variant="contained"
        sx={{ mb: 2, borderRadius: 5, height: '62px' }}
        color="primary"
        size="large"
        onClick={() => setStep(SignUpFormSteps.Name)}
      >
        Continue
      </Button>
    </Box>
  );
};

export default SignUpUserRole;

type Props = {
  title: string;
  description: string;
  imageUrl: string;
  value: UserRole;
};
const RoleCardCheckbox = ({ title, description, imageUrl, value }: Props) => {
  const { setSignUpValues, signUpValues } = useSignUpValues();
  const isActive = signUpValues.role === value;
  return (
    <Box
      sx={{
        border: (t) => `1px solid ${t.palette.common.black}`,
        borderRadius: 5,
        py: 2,
        px: 1,
        display: 'flex',
        alignItems: 'center',
      }}
      component="div"
      onClick={() => {
        if (!isActive) {
          setSignUpValues((p) => ({ ...p, role: value }));
        }
      }}
    >
      <Box component="img" src={imageUrl} sx={{ width: '80px', height: 'auto' }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">{title}</Typography>
          <Checkbox checked={isActive} />
        </Box>
        <Typography variant="body2" color="textPrimary">
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

const ROLES: Props[] = [
  {
    title: 'Owner',
    description: 'Track your pet’s care, appointments, and find nearby pet sitters.',
    imageUrl: '/assets/images/petOwner.png',
    value: Roles.PetOwner,
  },
  {
    title: 'Sitter/Walker',
    description: 'Help other by offering pet-sitting services, build trust and earn.',
    imageUrl: '/assets/images/my-dog.png',
    value: Roles.WalkerKeeper,
  },
  {
    title: 'Veterinarian',
    description: 'Manage pet health records and provide professional support.',
    imageUrl: '/assets/images/lonely-dog.png',
    value: Roles.Veterinarian,
  },
];
