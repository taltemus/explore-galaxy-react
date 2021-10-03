import { useDispatch } from 'react-redux';
import { ApplicationError, ErrorCode } from '../../models/applicationError';
import { setValidationError, signUp } from '../../store/user/slice';
import AuthenticationForm from './AuthenticationForm';
import { validatePassword, validateUsername } from '../../utils/validation';

export interface SignUpProps {
  error?: ApplicationError;
  isLoading: boolean;
}

function SignUp({ error, isLoading = false }: SignUpProps) {
  const dispatch = useDispatch();
  function onSubmitSignUp(username?: string, password?: string) {
    if (!username || !validateUsername(username))
      return dispatch(
        setValidationError({
          code: ErrorCode.INVALID_ATTRIBUTES,
          message: 'Username is not a valid email',
        })
      );
    if (!password || !validatePassword(password))
      return dispatch(
        setValidationError({
          code: ErrorCode.INVALID_ATTRIBUTES,
          message: 'Password is does not meet the complexity requirements',
        })
      );

    dispatch(signUp({ email: username, password }));
  }

  return (
    <>
      <AuthenticationForm
        title="Sign Up"
        buttonText="Sign Up"
        buttonAction={onSubmitSignUp}
        isLoading={isLoading}
        error={error}
        redirect=""
      />
      <div>Already have an account? Sign In</div>
    </>
  );
}

export default SignUp;
