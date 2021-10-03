import { useSelector } from 'react-redux';
import SignIn from '../components/Authentication/SignIn';
import SignUp from '../components/Authentication/SignUp';
import { RootState } from '../store';

function Authentication() {
  const { isLoading, error } = useSelector((state: RootState) => state.user);
  return (
    <section>
      <SignIn isLoading={isLoading} error={error} />
      <SignUp isLoading={isLoading} error={error} />
    </section>
  );
}

export default Authentication;
