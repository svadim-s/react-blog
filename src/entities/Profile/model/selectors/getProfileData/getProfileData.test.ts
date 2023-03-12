import { StateSchema } from 'app/providers/StoreProvider'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { getProfileData } from './getProfileData'

describe('getProfileData', () => {
  test('should return data', () => {
    const data = {
      username: 'admin',
      age: 22,
      country: Country.Russia,
      lastname: 'Sergeev',
      first: 'Vadim',
      city: 'Moscow',
      currency: Currency.RUB
    }
    const state: DeepPartial<StateSchema> = {
      profile: {
        data
      }
    }
    expect(getProfileData(state as StateSchema)).toEqual(data)
  })

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileData(state as StateSchema)).toEqual(undefined)
  })
})
