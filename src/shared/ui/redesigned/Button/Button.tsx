import { memo, ReactNode, type ButtonHTMLAttributes } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline'

export type ButtonSize = 'm' | 'l' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: ButtonVariant
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
  children?: ReactNode
  fullWidth?: boolean
}

export const Button = memo((props: ButtonProps) => {
  const {
    children,
    className,
    variant = 'outline',
    square,
    size = 'm',
    disabled,
    fullWidth,
    ...otherProps
  } = props

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth
  }

  const additional: Array<string | undefined> = [
    className,
    cls[variant],
    cls[size]
  ]

  return (
    <button
      type='button'
      className={classNames(cls.Button, mods, additional)}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
})
