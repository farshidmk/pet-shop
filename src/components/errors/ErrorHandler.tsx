import { Alert, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

type Props = {
  onRefetch: () => void;
  errorText?: string;
};

const ErrorHandler: React.FC<Props> = ({ onRefetch, errorText = 'Failed to fetch data' }) => {
  return (
    <Alert
      severity="error"
      variant="standard"
      sx={{
        display: 'flex',
      }}
    >
      {errorText}
      <IconButton onClick={onRefetch}>
        <RefreshIcon />
      </IconButton>
    </Alert>
  );
};

export default ErrorHandler;
