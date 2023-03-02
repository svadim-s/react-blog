import { DeepPartial } from '@reduxjs/toolkit'
import { LoginSchema } from '../types/loginSchema'
import { loginActions, loginReducer } from './loginSlice'

describe('loginSlice', () => {
  test('tests set username', () => {
    const state: DeepPartial<LoginSchema> = { username: '123' }
    expect(loginReducer(
      state as LoginSchema,
      loginActions.setUsername('123123')
    )).toEqual({ username: '123123' })
  })

  test('tests set password', () => {
    const state: DeepPartial<LoginSchema> = { password: '123' }
    expect(loginReducer(
      state as LoginSchema,
      loginActions.setPassword('123123')
    )).toEqual({ password: '123123' })
  })
})
