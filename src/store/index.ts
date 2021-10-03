import { configureStore } from '@reduxjs/toolkit';
import {
  auth,
  MapFirebaseUser,
  onAuthStateChanged,
} from '../services/firebase';
import bankReducer from './bank/slice';
import userReducer, { setCurrentUser, unSetCurrentUser } from './user/slice';

export const store = configureStore({
  reducer: { bank: bankReducer, user: userReducer },
});
onAuthStateChanged(auth, (user) => {
  if (!user) return store.dispatch(unSetCurrentUser());
  return store.dispatch(setCurrentUser(MapFirebaseUser(user)));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
