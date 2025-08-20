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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IconButton color="secondary" onClick={() => setStep(SignUpFormSteps.Email)}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h6">Choose Your Role</Typography>
        <IconButton sx={{ opacity: 0 }}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, overflow: 'auto' }}>
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
        py: 5,
        px: 3,
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
      <Box component="img" src={imageUrl} sx={{ width: '120px', height: 'auto' }} />
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
    title: 'Pet Owner',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident  Autem sed, maiores possimus doloremque tenetur a.',
    imageUrl: '/assets/images/petOwner.png',
    value: Roles.PetOwner,
  },
  {
    title: 'Veterinarian',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident  Autem sed, maiores possimus doloremque tenetur a.',
    imageUrl: '/assets/images/lonely-dog.png',
    value: Roles.Veterinarian,
  },
  {
    title: 'Pet Keeper',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident  Autem sed, maiores possimus doloremque tenetur a.',
    imageUrl: '/assets/images/my-dog.png',
    value: Roles.WalkerKeeper,
  },
];
