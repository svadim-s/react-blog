import { Menu } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { DropDownDirection } from 'shared/types/ui'
import { AppLink } from '../AppLink/AppLink'
import cls from './Dropdown.module.scss'

export interface DropdownItem {
  content?: ReactNode
  disabled?: boolean
  onClick?: () => void
  href?: string
}

interface DropdownProps {
  className?: string
  items: DropdownItem[]
  trigger: ReactNode
  direction?: DropDownDirection
}

const mapDirectionClasses: Record<DropDownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top left': cls.optionsTopLeft,
  'top right': cls.optionsTopRight
}

export function Dropdown (props: DropdownProps) {
  const {
    className,
    items,
    trigger,
    direction = 'bottom right'
  } = props

  const menuClasses = [mapDirectionClasses[direction]]

  return (
    <Menu as='div' className={classNames(cls.Dropdown, {}, [className])}>
      <Menu.Button className={cls.btn}>
        {trigger}
      </Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type='button'
              disabled={item.disabled}
              onClick={item.onClick}
              className={classNames(cls.item, { [cls.active]: active }, [])}
            >
              {item.content}
            </button>
          )

          if (item.href) {
            return (
              <Menu.Item as={AppLink} to={item.href} disabled={item.disabled} key={index}>
                {content}
              </Menu.Item>
            )
          }

          return (
            <Menu.Item as={Fragment} disabled={item.disabled} key={index}>
              {content}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
}
