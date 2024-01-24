import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Avatar } from '@/shared/ui/Avatar'
import { Dropdown } from '@/shared/ui/Popups'
import { RoutePath } from '@/shared/const/router'

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

  return (
    <>
      {/* eslint-disable @typescript-eslint/indent */}
      <Dropdown
        className={classNames('', {}, [className])}
        direction='bottom left'
        items={[...(isAdminPanelAvailable
          ? [{
            content: t('Админка'),
            href: RoutePath.admin_panel
          }]
          : []),
        {
          content: t('Профиль'),
          href: RoutePath.profile + authData.id
        },
        {
          content: t('Выйти'),
          onClick: onLogout
        }
        ]}
        trigger={<Avatar size={30} src={authData.avatar} />}
      />
    </>
  )
}
