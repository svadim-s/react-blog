import { getUserAuthData } from '@/entities/User'
import { LoginModal } from '@/features/AuthByUsername'
import React, { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink'
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button'
import { Button } from '@/shared/ui/redesigned/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import cls from './Navbar.module.scss'
import { NotificationButton } from '@/features/notificationButton'
import { AvatarDropdown } from '@/features/avatarDropdown'
import { getRouteArticleCreate } from '@/shared/const/router'
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features'

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useSelector(getUserAuthData)

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.NavbarRedesigned,
    off: () => cls.Navbar
  })

  if (authData) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <header className={classNames(mainClass, {}, [className])}>
            <HStack gap='16' className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classNames(mainClass, {}, [className])}>
            <Text
              title='React Blog'
              className={cls.appName}
              theme={TextTheme.INVERTED}
            />
            <AppLink
              to={getRouteArticleCreate()}
              theme={AppLinkTheme.SECONDARY}
              className={cls.createBtn}
            >
              {t('Create an article')}
            </AppLink>
            <HStack gap='16' className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />

    )
  }

  return (
    <header className={classNames(mainClass, {}, [className])}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <Button
            className={cls.links}
            onClick={onShowModal}
            variant='clear'
          >
            {t('Войти')}
          </Button>
        }
        off={
          <ButtonDeprecated
            theme={ThemeButton.CLEAR_INVERTED}
            className={cls.links}
            onClick={onShowModal}
          >
            {t('Войти')}
          </ButtonDeprecated>
        }
      />
      {isAuthModal &&
        <LoginModal
          isOpen={isAuthModal}
          onClose={onCloseModal}
        />
      }
    </header>
  )
})
