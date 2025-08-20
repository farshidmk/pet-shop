import useSignUpValues from './hooks/useSignUpValues';
import SignUpProvider from './SignUpProvider';
import { motion, AnimatePresence } from 'framer-motion';
import SignUpUserEmail from './SignUpUserEmail';
import SignUpUserRole from './SignUpUserRole';
import SignUpUserInfo from './SignUpUserInfo';
import { SignUpFormSteps } from './signUp.types';

const SignUpPage = () => {
  return (
    <SignUpProvider>
      <SignUpForms />
    </SignUpProvider>
  );
};

export default SignUpPage;

const SignUpForms = () => {
  const { step } = useSignUpValues();

  return (
    <>
      <AnimatePresence mode="wait">
        {step === SignUpFormSteps.Email ? (
          <motion.div
            key="box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            style={{ height: '100%' }}
          >
            <SignUpUserEmail />
          </motion.div>
        ) : step === SignUpFormSteps.Role ? (
          <motion.div
            key="box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            style={{ height: '100%' }}
          >
            <SignUpUserRole />
          </motion.div>
        ) : (
          <motion.div
            key="box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            style={{ height: '100%' }}
          >
            <SignUpUserInfo />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
