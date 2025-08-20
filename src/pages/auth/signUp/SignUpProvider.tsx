import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

import { Roles, type SignUpFormStep, type SignUpItems } from './signUp.types';

export const SignUpContext = createContext<{
  signUpValues: SignUpItems;
  setSignUpValues: Dispatch<SetStateAction<SignUpItems>>;
  step: SignUpFormStep;
  setStep: Dispatch<SetStateAction<SignUpFormStep>>;
} | null>(null);

const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<SignUpFormStep>('email');
  const [signUpValues, setSignUpValues] = useState<SignUpItems>({
    email: '',
    password: '',
    role: Roles.PetOwner,
    firstName: '',
    lastName: '',
    phone: '',
  });
  return (
    <SignUpContext
      value={{
        setSignUpValues,
        signUpValues,
        step,
        setStep,
      }}
    >
      {children}
    </SignUpContext>
  );
};

export default SignUpProvider;
