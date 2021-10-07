import { ApplicationError } from './../../models/applicationError';
import { promiseHelper } from './../../utils/promise';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import {
  signInUser,
  signOutUser,
  signUpUser,
} from '../../services/authentication';

export interface AuthenticationPayload {
  email: string;
  password: string;
}

export const signIn = createAsyncThunk(
  'user/signInUser',
  async ({ email, password }: AuthenticationPayload) => {
    return await promiseHelper.execute<User, ApplicationError>(
      signInUser(email, password)
    );
  }
);

export const signUp = createAsyncThunk(
  'user/signUpUser',
  async ({ email, password }: AuthenticationPayload) => {
    return await promiseHelper.execute<User, ApplicationError>(
      signUpUser(email, password)
    );
  }
);

export const signOut = createAsyncThunk('user/signOut', async () => {
  return await promiseHelper.execute<void, ApplicationError>(signOutUser());
});

export interface UserState {
  currentUser?: User;
  error?: ApplicationError;
  isLoading: boolean;
}

const initialState: UserState = {
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setValidationError: (
      state,
      { payload }: PayloadAction<ApplicationError>
    ) => {
      state.error = payload;
    },
    setCurrentUser: (state, { payload }: PayloadAction<User>) => {
      state.currentUser = payload;
    },
    unSetCurrentUser: (state) => {
      state.currentUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.currentUser = undefined;
      state.error = undefined;
      state.isLoading = true;
    });

    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      if (payload[1]) state.error = payload[1];
      state.isLoading = false;
    });

    builder.addCase(signOut.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signOut.fulfilled, (state, { payload }) => {
      state.currentUser = undefined;
      state.error = undefined;
      state.isLoading = false;
    });

    builder.addCase(signUp.pending, (state) => {
      state.currentUser = undefined;
      state.error = undefined;
      state.isLoading = true;
    });

    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      if (payload[1]) state.error = payload[1];
      state.isLoading = false;
    });
  },
});

export const { setCurrentUser, setValidationError, unSetCurrentUser } =
  userSlice.actions;
export default userSlice.reducer;
