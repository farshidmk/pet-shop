import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

type Props = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

function UploadPetImage({ setFile }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const first = acceptedFiles[0];
    if (first) {
      setFile(first);
      setPreviewUrl(URL.createObjectURL(first));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      image: ['image/*'],
    },
    multiple: false,

    // You can also use onDropAccepted / onDropRejected for fine control
  });

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 2,
      }}
    >
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #ccc',
          textAlign: 'center',
          borderRadius: '50%',
          cursor: 'pointer',
          backgroundColor: grey[300],
          height: '150px',
          width: '150px',
          my: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <Box
            component="img"
            src={previewUrl}
            alt="Preview"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '50%',
            }}
          />
        ) : (
          <Typography textAlign="center">
            Upload your pet's <i>photo</i>
          </Typography>
        )}
      </Box>
      <Typography textAlign="center" variant="body2" fontSize={14} fontWeight={600}>
        Your pet's Photo
      </Typography>
    </Box>
  );
}

export default UploadPetImage;
