import type { PetGender } from '../profile/pets/pet.types';

export type SearchPet = {
  latitude: string;
  longitude: string;
  radius?: string;
  species?: string;
  breed?: string;
  days?: string;
};

export type SearchPetResult = {
  errorCode: number;
  success: boolean;
  results: SearchPetInfo[];
  count: number;
};

export type SearchPetInfo = {
  report_id: number;
  finder_id: number;
  species: string;
  breed: string;
  color: string;
  approximate_age: null;
  gender: PetGender;
  found_address: string;
  latitude: string;
  longitude: string;
  found_date: string;
  condition_description: string;
  behavior_observed: null;
  has_collar: 0;
  collar_description: null;
  has_microchip: 0;
  contact_phone: string;
  contact_email: null;
  current_location: null;
  shelter_name: null;
  shelter_contact: null;
  status: 'found';
  created_at: string;
  updated_at: string;
};
