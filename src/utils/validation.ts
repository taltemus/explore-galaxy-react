/** The defined regex validations for different scenarios */
const validationRegex = {
  capitalLetter: /[A-Z]+/,
  lowercaseLetter: /[a-z]+/,
  number: /[0-9]+/,
  specialCharacter: /[,<>./\\;'!@#$%^&*)([\]]+/,
  username: /^\S+@\S+\.\S+$/,
};

/**
 * Determines whether a username is valid or invalid.
 * @param username The username to validate.
 * @returns True if the password is valid. False is the password is invalid.
 */
export function validateUsername(username?: string): boolean {
  if (!username) return false;
  if (username.length < 4) return false;
  if (validationRegex.username.test(username)) return true;
  return false;
}

/**
 * Determines whether a password is valid or invalid.
 * @param password The password to validate.
 * @returns True if the password is valid. False if the password is invalid.
 */
export function validatePassword(password?: string): boolean {
  const { capitalLetter, lowercaseLetter, number, specialCharacter } =
    validationRegex;
  if (!password) return false;
  if (password.length < 6) return false;
  if (
    capitalLetter.test(password) &&
    lowercaseLetter.test(password) &&
    (number.test(password) || specialCharacter.test(password))
  )
    return true;

  return false;
}
