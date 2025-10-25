export type FoundPet = {
  species: string;
  breed: string;
  color: string;
  found_address: string;
  latitude: number;
  longitude: number;
  found_date: string;
  condition_description: string;
  contact_phone: string;
};

export type FoundPetResponse = {
  errorCode: number;
  message: string;
  reportId: number;
  success: true;
};
