import { Currency } from '../../model/types/currency'
import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups'
import { ToggleFeatures } from '@/shared/lib/features'
import { ListBox } from '@/shared/ui/redesigned/Popups'

interface CurrencySelectProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.EUR, content: Currency.EUR }
]

export const CurrencySelect = memo(({ className, value, onChange, readonly }: CurrencySelectProps) => {
  const { t } = useTranslation('profile')

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency)
  }, [onChange])

  const props = {
    className,
    value,
    defaultValue: t('Specify the currency'),
    items: options,
    onChange: onChangeHandler,
    readonly,
    direction: 'top right' as const,
    label: t('Specify the currency')
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<ListBox {...props} />}
      off={<ListBoxDeprecated {...props} />}
    />

  )
})
