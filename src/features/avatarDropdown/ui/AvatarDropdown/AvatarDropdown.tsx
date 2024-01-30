import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar'
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups'
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router'
import { ToggleFeatures } from '@/shared/lib/features'
import { Dropdown } from '@/shared/ui/redesigned/Popups'
import { Avatar } from '@/shared/ui/redesigned/Avatar'

interface AvatarDropdownProps {
  className?: string
}

export const AvatarDropdown = ({ className }: AvatarDropdownProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)
  const authData = useSelector(getUserAuthData)

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  const isAdminPanelAvailable = isAdmin || isManager

  if (!authData) {
    return null
  }

  const items = [
    ...(isAdminPanelAvailable
      ? [
        /* eslint-disable @typescript-eslint/indent */
        {
          content: t('Админка'),
          href: getRouteAdminPanel()
        }
      ]
      : []),
    {
      content: t('Профиль'),
      href: getRouteProfile(authData.id)
    },
    {
      content: t('Выйти'),
      onClick: onLogout
    }
  ]

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Dropdown
          className={classNames('', {}, [className])}
          direction='bottom left'
          items={items}
          trigger={<Avatar size={40} src={authData.avatar} />}
        />
      }
      off={
        <DropdownDeprecated
          className={classNames('', {}, [className])}
          direction='bottom left'
          items={items}
          trigger={<AvatarDeprecated fallbackInverted size={30} src={authData.avatar} />}
        />
      }
    />
  )
}
