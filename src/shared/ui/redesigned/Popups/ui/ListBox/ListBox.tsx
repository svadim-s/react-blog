import { Listbox as HListBox } from '@headlessui/react'
import React, { Fragment, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DropDownDirection } from '@/shared/types/ui'
import { Button } from '../../../Button/Button'
import { HStack } from '../../../../redesigned/Stack'
import { mapDirectionClasses } from '../../styles/consts'
import cls from './ListBox.module.scss'
import popupCls from '../../styles/popup.module.scss'

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

interface ListBoxProps {
  items?: ListBoxItem[]
  className?: string
  value?: string
  defaultValue?: string
  onChange: (value: string) => void
  readonly?: boolean
  direction?: DropDownDirection
  label?: string
}

export function ListBox (props: ListBoxProps) {
  const {
    items,
    className,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom right',
    label
  } = props

  const optionsClasses = [mapDirectionClasses[direction], popupCls.menu]

  return (
    <HStack gap='4'>
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as='div'
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button as='div' className={cls.trigger}>
          <Button disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    cls.item,
                    {
                      [popupCls.active]: active,
                      [popupCls.disabled]: item.disabled
                    },
                    [className]
                  )}
                >
                  {selected && '!!!'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  )
}
