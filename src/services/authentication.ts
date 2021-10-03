import { AuthError } from '@firebase/auth';
// import { store } from '../store';
// import { setCurrentUser, unSetCurrentUser } from '../store/user/slice';
import { promiseHelper } from '../utils/promise';
import {
  auth,
  createUser,
  mapFirebaseAuthError,
  MapFirebaseUser,
  sendUserVerification,
  signInUserByEmail,
} from './firebase';

/**
 * Attempts to sign in a user in firebase
 * @param email The email of the user to authenticate
 * @param password The password to associate with the email
 * @returns The authenticated user
 * @throws An application error if there firebase request fails
 */
export async function signInUser(email: string, password: string) {
  const [, error] = await promiseHelper.execute<void, AuthError>(
    signInUserByEmail(email, password)
  );
  if (!error) return getAuthenticatedUser();

  throw mapFirebaseAuthError(error);
}

/**
 *
 * @param email The email of the new user
 * @param password The password to associate with the email
 * @returns The authenticated user
 * @throws An application error if there firebase request fails
 */
export async function signUpUser(email: string, password: string) {
  const [, error] = await promiseHelper.execute<void, AuthError>(
    createUser(email, password)
  );
  if (!error) {
    const user = getAuthenticatedUser();
    if (user)
      await promiseHelper.execute(sendUserVerification(auth.currentUser!));

    return user;
  }

  throw mapFirebaseAuthError(error);
}

/**
 * Signs the user out from the firebase application
 * @returns
 * @throws An application error if there request to firebase fails
 */
export async function signOutUser() {
  const [, error] = await promiseHelper.execute<void, AuthError>(
    auth.signOut()
  );
  if (!error) return;
  throw mapFirebaseAuthError(error);
}

/**
 * Gets the user who is currently authenticated in firebase
 * @returns The currently authenticated user
 */
export function getAuthenticatedUser() {
  if (!auth?.currentUser?.email) return undefined;

  return MapFirebaseUser(auth.currentUser);
}
