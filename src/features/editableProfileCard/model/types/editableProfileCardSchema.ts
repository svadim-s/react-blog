import { Profile } from 'entities/Profile'

export enum ValidateProfileError {
  INCORRECT_USER_DATA = 'ICORRECT_USER_DATA',
  INCORRECT_AGE = 'ICORRECT_AGE',
  INCORRECT_COUNTRY = 'ICORRECT_COUNTRY',
  INCORRECT_CURRENCY = 'ICORRECT_CURRENCY',
  NO_DATA = 'NO_DATA',
  SERVER_ERROR = 'SERVER_ERROR'
}

export interface ProfileSchema {
  data?: Profile
  form?: Profile
  isLoading: boolean
  error?: string
  readonly: boolean
  validateErrors?: ValidateProfileError[]
}
