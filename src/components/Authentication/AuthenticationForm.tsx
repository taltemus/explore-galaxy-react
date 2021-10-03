import React, { useRef } from 'react';
import { ApplicationError } from '../../models/applicationError';

export interface AuthenticationFormProps {
  title: string;
  buttonText: string;
  buttonAction: (username?: string, password?: string) => void;
  isLoading: boolean;
  error?: ApplicationError;
  redirect?: string;
}

function AuthenticationForm({
  title,
  buttonText,
  buttonAction,
  isLoading,
  error,
  redirect,
}: AuthenticationFormProps) {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  function submitForm(event: React.MouseEvent) {
    event.preventDefault();
    const usernameValue = username?.current?.value;
    const passwordValue = password?.current?.value;
    buttonAction(usernameValue, passwordValue);

    if (redirect) return;
  }

  return (
    <div>
      <form>
        {error && error.message && <div>{error.message}</div>}

        <h2>{title}</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input
            ref={username}
            type="email"
            id="username"
            name="username"
            placeholder="example@prep.io"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            ref={password}
            type="password"
            id="password"
            name="password"
            placeholder="************"
            required
          />
          <button onClick={submitForm} disabled={isLoading}>
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthenticationForm;
