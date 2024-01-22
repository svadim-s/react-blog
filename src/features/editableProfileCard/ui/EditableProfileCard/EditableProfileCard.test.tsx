import { screen } from '@testing-library/react'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { Profile } from '@/entities/Profile'
import { profileReducer } from '../../model/slice/profileSlice'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'
import { EditableProfileCard } from './EditableProfileCard'
import { userEvent } from '@testing-library/user-event'
import { $api } from '@/shared/api/api'

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'admin',
  age: 22,
  country: Country.Russia,
  city: 'Moscow',
  currency: Currency.RUB,
  username: 'admin123'
}

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile
    },
    user: {
      authData: {
        id: '1'
      }
    }
  },

  asyncReducers: {
    profile: profileReducer
  }
}

describe('features/EditableProfileCard', () => {
  test('Режим readonly должен переключатсья', async () => {
    componentRender(<EditableProfileCard id='1' />, options)

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
  })

  test('При отмене значения обнуляются', async () => {
    componentRender(<EditableProfileCard id='1' />, options)

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'))

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin')
  })

  test('Должна появиться валидация', async () => {
    componentRender(<EditableProfileCard id='1' />, options)

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument()
  })

  test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
    const mockPutReq = jest.spyOn($api, 'put').mockReturnValue(
      Promise.resolve({
        data: profile
      })
    )
    componentRender(<EditableProfileCard id="1" />, options)

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

    expect(mockPutReq).toHaveBeenCalled()
  })
})
