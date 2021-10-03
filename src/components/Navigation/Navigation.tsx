import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { signOut } from '../../store/user/slice';

function Navigation() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      <div>{currentUser?.email}</div>
      {currentUser?.isVerified && <div>{'Verified User!'}</div>}
      <button onClick={() => dispatch(signOut())}>Sign Out</button>
    </>
  );
}

export default Navigation;
