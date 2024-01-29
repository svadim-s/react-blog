import { classNames } from '@/shared/lib/classNames/classNames'
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg'
import ThemeIcon from '@/shared/assets/icons/theme.svg'
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button'
import { memo, useCallback } from 'react'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { saveJsonSettings } from '@/entities/User'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { ToggleFeatures } from '@/shared/lib/features'
import { Icon } from '@/shared/ui/redesigned/Icon'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toogleTheme } = useTheme()
  const dispatch = useAppDispatch()

  const onToggleHandler = useCallback(() => {
    toogleTheme((newTheme) => {
      dispatch(saveJsonSettings({
        theme: newTheme
      }))
    })
  }, [dispatch, toogleTheme])

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />
      }
      off={
        <Button
          theme={ThemeButton.CLEAR}
          className={classNames('', {}, [className])}
          onClick={onToggleHandler}
        >
          <IconDeprecated Svg={ThemeIconDeprecated} width={40} height={40} inverted />
        </Button>
      }
    />
  )
})
