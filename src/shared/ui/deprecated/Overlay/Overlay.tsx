import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Overlay.module.scss'

interface OverlayProps {
  className?: string
  onClick?: () => void
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Overlay = memo(({ className, onClick }: OverlayProps) => {
  return (
    <div onClick={onClick} className={classNames(cls.Overlay, {}, [className])} />
  )
})