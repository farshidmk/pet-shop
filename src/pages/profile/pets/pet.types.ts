export type Pet = {
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
