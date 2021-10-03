const validationRegex = {
  capitalLetter: /[A-Z]+/,
  lowercaseLetter: /[a-z]+/,
  number: /[0-9]+/,
  specialCharacter: /[,<>./\\;'!@#$%^&*)([\]]+/,
  username: /^\S+@\S+\.\S+$/,
};

export function validateUsername(username?: string): boolean {
  if (!username) return false;
  if (username.length < 4) return false;
  if (validationRegex.username.test(username)) return true;
  return false;
}

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
