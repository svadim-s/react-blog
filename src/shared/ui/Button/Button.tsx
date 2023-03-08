import { memo, ReactNode, type ButtonHTMLAttributes } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ThemeButton {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
  children?: ReactNode
}

export const Button = memo((props: ButtonProps) => {
  const {
    children,
    className,
    theme = ThemeButton.OUTLINE,
    square,
    size = ButtonSize.M,
    disabled,
    ...otherProps
  } = props

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled
  }

  const additional: Array<string | undefined> = [
    className,
    cls[theme],
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
