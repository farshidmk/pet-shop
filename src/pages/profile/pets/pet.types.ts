export type PetFormItem = {
  id?: number;
  name: string;
  species: string;
  breed: string;
  color: string;
  age: number;
  gender: PetGender;
};

export enum PetGender {
  Male = 'male',
  Female = 'female',
}

export type PetRegisterResponse = {
  errorCode: number;
  message: string;
  petId: number;
  success: true;
};

export type Pet = {
  age: number;
  behavior_description: string;
  breed: string;
  color: string;
  created_at: string;
  distinguishing_features: string;
  gender: PetGender;
  is_missing: number;
  microchip_number: number;
  name: string;
  owner_id: number;
  pet_id: number;
  special_needs: string;
  species: string;
  updated_at: string;
  vaccination_status: string;
  weight: number;
};
