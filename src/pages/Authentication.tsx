import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import SignIn from '../components/Authentication/SignIn';
import SignUp from '../components/Authentication/SignUp';
import { RootState } from '../store';

function Authentication() {
  const { currentUser, error, isLoading } = useSelector(
    (state: RootState) => state.user
  );

  if (currentUser) return <Redirect to="/" />;

  return (
    <section>
      <Switch>
        <Route exact path="/auth/sign-in">
          <SignIn isLoading={isLoading} error={error} />
        </Route>
        <Route exact path="/auth/sign-up">
          <SignUp isLoading={isLoading} error={error} />
        </Route>
        <Route path="/">
          <Redirect to="/auth/sign-in" />
        </Route>
      </Switch>
    </section>
  );
}

export default Authentication;
