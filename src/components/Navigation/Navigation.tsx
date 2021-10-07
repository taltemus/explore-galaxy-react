import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { signOut } from '../../store/user/slice';

function Navigation() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      <div>{currentUser?.email}</div>
      {currentUser?.isVerified && <div>{'Verified User!'}</div>}
      {!currentUser && (
        <div>
          <Link to="/auth/sign-in">Sign In</Link>
          <Link to="/auth/sign-up">Register</Link>
        </div>
      )}
      {currentUser && (
        <button onClick={() => dispatch(signOut())}>Sign Out</button>
      )}
    </>
  );
}

export default Navigation;
