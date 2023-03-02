import { FC, lazy } from 'react'
import { LoginFormProps } from './LoginForm'

export const LoginFormAsync = lazy<FC<LoginFormProps>>(async () => await new Promise((resolve) => {
  // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
  setTimeout(() => { resolve(import('./LoginForm')) }, 1500)
}))
