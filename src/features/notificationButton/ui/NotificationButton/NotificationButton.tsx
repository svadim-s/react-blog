import { NotificationList } from 'entities/Notification'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import { Popover } from 'shared/ui/Popups'
import NotificationIcon from 'shared/assets/icons/notification.svg'
import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
  return (
    <Popover
      className={classNames(cls.NotificationButton, {}, [className])}
      direction='bottom left'
      trigger={(
        <Button theme={ThemeButton.CLEAR}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      )}>
      <NotificationList className={cls.notifications} />
    </Popover>
  )
}
