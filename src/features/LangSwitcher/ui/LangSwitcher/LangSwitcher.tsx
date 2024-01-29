import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button'
import { ToggleFeatures } from '@/shared/lib/features'
import { Button } from '@/shared/ui/redesigned/Button'

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()

  const toogle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Button
          variant='clear'
          onClick={toogle}
        >
          {t(short ? 'Короткий язык' : 'Язык')}
        </Button>
      }
      off={
        <ButtonDeprecated
          className={classNames('', {}, [className])}
          theme={ThemeButton.CLEAR}
          onClick={toogle}
        >
          {t(short ? 'Короткий язык' : 'Язык')}
        </ButtonDeprecated>
      }
    />
  )
})
