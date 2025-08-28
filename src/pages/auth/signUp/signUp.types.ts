export const Roles = {
  PetOwner: 'pet_owner',
  WalkerKeeper: 'walker_keeper',
  Veterinarian: 'veterinarian',
  LostFoundUser: 'LostFoundUser',
} as const;

export type UserRole = (typeof Roles)[keyof typeof Roles];

export type SignUpItems = {
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  clinic_name?: string;
  services_offered?: string;
};

export const SignUpFormSteps = {
  Email: 'email',
  Role: 'role',
  Name: 'name',
} as const;

export type SignUpFormStep = (typeof SignUpFormSteps)[keyof typeof SignUpFormSteps];
