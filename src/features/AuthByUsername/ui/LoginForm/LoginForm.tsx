import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button'
import { Button } from '@/shared/ui/redesigned/Button'
import cls from './LoginForm.module.scss'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Input } from '@/shared/ui/redesigned/Input'
import { ToggleFeatures } from '@/shared/lib/features'
import { VStack } from '@/shared/ui/redesigned/Stack'

export interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const initialReducers: ReducerList = {
  loginForm: loginReducer
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const isLoading = useSelector(getLoginIsLoading)
  const error = useSelector(getLoginError)

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }))
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess()
    }
  }, [onSuccess, dispatch, password, username])

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={initialReducers}
    >
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <VStack gap='16' className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Форма авторизации')} />
            {error &&
            <Text
              text={t('Вы ввели неверный логин или пароль')}
              variant='error'
            />
            }
            <Input
              autoFocus
              placeholder={t('Введите логин')}
              type="text"
              className={cls.input}
              onChange={onChangeUsername}
              value={username}
            />
            <Input
              placeholder={t('Введите пароль')}
              type="text"
              className={cls.input}
              onChange={onChangePassword}
              value={password}
            />
            <Button
              variant='outline'
              className={cls.loginBtn}
              onClick={() => { onLoginClick() }}
              disabled={isLoading}
            >
              {t('Войти')}
            </Button>
          </VStack>
        }
        off={
          <div className={classNames(cls.LoginForm, {}, [className])}>
            <TextDeprecated title={t('Форма авторизации')} />
            {error &&
            <TextDeprecated
              text={t('Вы ввели неверный логин или пароль')}
              theme={TextTheme.ERROR}
            />
            }
            <InputDeprecated
              autoFocus
              placeholder={t('Введите логин')}
              type="text"
              className={cls.input}
              onChange={onChangeUsername}
              value={username}
            />
            <InputDeprecated
              placeholder={t('Введите пароль')}
              type="text"
              className={cls.input}
              onChange={onChangePassword}
              value={password}
            />
            <ButtonDeprecated
              theme={ThemeButton.OUTLINE}
              className={cls.loginBtn}
              onClick={() => { onLoginClick() }}
              disabled={isLoading}
            >
              {t('Войти')}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  )
})

export default LoginForm
