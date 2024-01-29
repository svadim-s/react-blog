import { NotificationList } from '@/entities/Notification'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button'
import { Popover } from '@/shared/ui/deprecated/Popups'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import cls from './NotificationButton.module.scss'
import { useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { Drawer } from '@/shared/ui/deprecated/Drawer'
import { Icon } from '@/shared/ui/deprecated/Icon'

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
    <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  )

  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction='bottom left'
          trigger={trigger}>
          <NotificationList className={cls.notifications} />
        </Popover>
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
