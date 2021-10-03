import { useDispatch } from 'react-redux';
import { ApplicationError, ErrorCode } from '../../models/applicationError';
import { setValidationError, signIn } from '../../store/user/slice';
import AuthenticationForm from './AuthenticationForm';

export interface SignInProps {
  error?: ApplicationError;
  isLoading: boolean;
}

function SignIn({ error, isLoading = false }: SignInProps) {
  const dispatch = useDispatch();
  function onSubmitSignIn(username?: string, password?: string) {
    if (!username)
      return dispatch(
        setValidationError({
          code: ErrorCode.INCORRECT_CREDENTIALS,
          message: 'Username is required',
        })
      );
    if (!password)
      return dispatch(
        setValidationError({
          code: ErrorCode.INCORRECT_CREDENTIALS,
          message: 'Username is required',
        })
      );
    dispatch(signIn({ email: username, password }));
  }

  return (
    <>
      <AuthenticationForm
        title="Sign In"
        buttonText="Sign In"
        buttonAction={onSubmitSignIn}
        isLoading={isLoading}
        error={error}
        redirect=""
      />
      <div>Don't have an account? Sign Up</div>
    </>
  );
}

export default SignIn;
