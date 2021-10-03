export enum ErrorCode {
  INVALID_ATTRIBUTES,
  INCORRECT_CREDENTIALS,
  INVALID_PASSWORD,
  UNKNOWN_ERROR,
  USER_ALREADY_EXISTS,
  WEAK_PASSWORD,
}

export interface ApplicationError {
  code: ErrorCode;
  message: string;
}
