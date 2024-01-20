import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { ValidateProfileError } from '../../consts/consts'
import { validateProfileData } from './validateProfileData'

const data = {
  username: 'admin',
  age: 22,
  country: Country.Russia,
  lastname: 'Sergeev',
  first: 'Vadim',
  city: 'Moscow',
  currency: Currency.RUB
}

describe('validateProfileData', () => {
  test('success', () => {
    const result = validateProfileData(data)

    expect(result).toEqual([])
  })

  test('without frist and last name', async () => {
    const result = validateProfileData({ ...data, first: '', lastname: '' })

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA
    ])
  })

  test('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: undefined })

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_AGE
    ])
  })

  test('incorrect country', async () => {
    const result = validateProfileData({ ...data, country: undefined })

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_COUNTRY
    ])
  })

  test('incorrect currency', async () => {
    const result = validateProfileData({ ...data, currency: undefined })

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_CURRENCY
    ])
  })

  test('incorrect all', async () => {
    const result = validateProfileData({})

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
      ValidateProfileError.INCORRECT_CURRENCY
    ])
  })
})
