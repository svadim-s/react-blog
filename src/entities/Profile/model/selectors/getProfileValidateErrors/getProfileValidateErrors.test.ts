import { StateSchema } from 'app/providers/StoreProvider'
import { ValidateProfileError } from 'entities/Profile'
import { getProfileValidateErrors } from './getProfileValidateErrors'

describe('getProfileError', () => {
  test('should return validateErrors', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileError.INCORRECT_USER_DATA,
          ValidateProfileError.SERVER_ERROR
        ]
      }
    }
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.SERVER_ERROR
    ])
  })

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined)
  })
})
