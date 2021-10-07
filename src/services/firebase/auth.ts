import {
  AuthError,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { ApplicationError, ErrorCode } from '../../models/applicationError';
import { User } from '../../models/User';
import { firebase } from './app';
export { onAuthStateChanged };
export type { FirebaseUser };

/** The auth context for the firebase application */
export const auth = getAuth(firebase);

/**
 * Creates a user in the firebase authentication store.
 * @param email The email to use for the new user.
 * @param password The password to use for the new user.
 */
export async function createUser(email: string, password: string) {
  await createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Signs in a user to the firebase application instance.
 * @param email The email of the user to sign in.
 * @param password The password of the user to sign in.
 */
export async function signInUserByEmail(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sends a verification email to a user.
 * @param user The user to send a email verification to.
 */
export async function sendUserVerification(user: FirebaseUser) {
  await sendEmailVerification(user);
}

/**
 * Maps a firebase AuthError to an ApplicationError.
 * @param error The authentication error from the firebase operation.
 * @returns The equivalent AppliciationError.
 */
export function mapFirebaseAuthError(error: AuthError): ApplicationError {
  function createApplicationError(
    code: ErrorCode,
    message: string
  ): ApplicationError {
    return { code, message };
  }

  switch (error.code) {
    case 'auth/weak-password':
      return createApplicationError(ErrorCode.INVALID_PASSWORD, error.message);
    case 'auth/invalid-email':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return createApplicationError(
        ErrorCode.INCORRECT_CREDENTIALS,
        error.message
      );
    case 'auth/email-already-in-use':
      return createApplicationError(
        ErrorCode.USER_ALREADY_EXISTS,
        error.message
      );
    case 'auth/too-many-requests':
      return createApplicationError(ErrorCode.LOCKED, error.message);
    default:
      return createApplicationError(ErrorCode.UNKNOWN_ERROR, error.message);
  }
}

/**
 * Maps an object that matches the @firebase/auth User model into the React-Prep.io
 * application User model.
 * @param user The @firebase/auth User to map to the React-Prep.io application User.
 * @returns The mapped React-Prep.io application User.
 */
export function MapFirebaseUser(user: FirebaseUser): User {
  return {
    email: user.email!,
    isVerified: user.emailVerified,
  };
}
