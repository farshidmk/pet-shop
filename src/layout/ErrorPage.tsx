import { Box, Button, Typography } from '@mui/material';
import { IS_DEVELOPMENT } from '../global';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';
import logo from '@assets/images/logo.png';

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Box
        component="div"
        sx={{
          background: (t) => t.palette.error.light,
          borderRadius: 10,
          width: 101,
          height: 101,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box component="img" src={logo} sx={{ height: 80, width: 80 }} />
      </Box>

      <Typography variant="h2" fontWeight={600} fontSize={36} color="primary" sx={{ mb: 8 }}>
        Pets Pulse
      </Typography>
      <Typography variant="h6" color="error">
        Something went wrong
      </Typography>
      {IS_DEVELOPMENT && (
        <Typography variant="caption" color="error">
          {isJsError(error) ? error.message : isRouteErrorResponse(error) ? error.data : JSON.stringify(error)}
        </Typography>
      )}
      <Button variant="outlined" onClick={() => navigate('/')}>
        dashboard
      </Button>
    </Box>
  );
};

export default ErrorPage;

function isJsError(obj: unknown): obj is Error {
  return typeof obj === 'object' && obj !== null && 'message' in obj;
}
