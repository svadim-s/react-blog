import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'

export enum ValidateProfileError {
  INCORRECT_USER_DATA = 'ICORRECT_USER_DATA',
  INCORRECT_AGE = 'ICORRECT_AGE',
  INCORRECT_COUNTRY = 'ICORRECT_COUNTRY',
  INCORRECT_CURRENCY = 'ICORRECT_CURRENCY',
  NO_DATA = 'NO_DATA',
  SERVER_ERROR = 'SERVER_ERROR'
}

export interface Profile {
  first?: string
  lastname?: string
  age?: number
  currency?: Currency
  country?: Country
  city?: string
  username?: string
  avatar?: string
}

export interface ProfileSchema {
  data?: Profile
  form?: Profile
  isLoading: boolean
  error?: string
  readonly: boolean
  validateErrors?: ValidateProfileError[]
}
