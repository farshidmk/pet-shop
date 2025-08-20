import { use } from 'react';
import { SignUpContext } from '../SignUpProvider';

const useSignUpValues = () => {
  const context = use(SignUpContext);
  if (!context) {
    throw new Error('useSignUpValues must be use inside SignUpProvider');
  }
  return context;
};

export default useSignUpValues;
