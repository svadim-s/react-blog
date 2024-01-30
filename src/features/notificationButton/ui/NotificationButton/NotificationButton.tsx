import { NotificationList } from '@/entities/Notification'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button'
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups'
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg'
import NotificationIcon from '@/shared/assets/icons/notification.svg'
import cls from './NotificationButton.module.scss'
import { useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { Drawer } from '@/shared/ui/deprecated/Drawer'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { ToggleFeatures } from '@/shared/lib/features'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Popover } from '@/shared/ui/redesigned/Popups'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false)
  }, [])

  const trigger = (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />
      }
      off={
        <ButtonDeprecated onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
          <IconDeprecated Svg={NotificationIconDeprecated} inverted />
        </ButtonDeprecated>
      }
    />
  )

  return (
    <div>
      <BrowserView>
        <ToggleFeatures
          feature='isAppRedesigned'
          on={
            <Popover
              className={classNames(cls.NotificationButton, {}, [className])}
              direction='bottom left'
              trigger={trigger}>
              <NotificationList className={cls.notifications} />
            </Popover>
          }
          off={
            <PopoverDeprecated
              className={classNames(cls.NotificationButton, {}, [className])}
              direction='bottom left'
              trigger={trigger}>
              <NotificationList className={cls.notifications} />
            </PopoverDeprecated>
          }
        />
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  )
}
