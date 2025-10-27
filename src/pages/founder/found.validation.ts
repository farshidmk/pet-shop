import * as yup from 'yup';

export const foundPetSchema = yup.object({
  species: yup.string().required('Species is required').min(2, 'Species must be at least 2 characters'),
  breed: yup.string().required('Breed is required').min(2, 'Breed must be at least 2 characters'),
  color: yup.string().required('Color is required').min(2, 'Color must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  found_address: yup.string().required('Found address is required').min(5, 'Please enter a valid address'),
  latitude: yup.number().required('Latitude is required').min(-90, 'Invalid latitude').max(90, 'Invalid latitude'),
  longitude: yup
    .number()
    .required('Longitude is required')
    .min(-180, 'Invalid longitude')
    .max(180, 'Invalid longitude'),
  found_date: yup
    .string()
    .required('Found date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  condition_description: yup
    .string()
    .required('Condition description is required')
    .min(5, 'Please describe the condition in more detail'),
  contact_phone: yup
    .string()
    .required('Contact phone is required')
    .matches(/^\+?[0-9\s\-]{7,15}$/, 'Please enter a valid phone number'),
});
