import { Country } from '../../model/types/country'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups'
import { ToggleFeatures } from '@/shared/lib/features'
import { ListBox } from '@/shared/ui/redesigned/Popups'

interface CountrySelectProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
}

const options = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.England, content: Country.England },
  { value: Country.Hungary, content: Country.Hungary },
  { value: Country.Serbia, content: Country.Serbia }
]

export const CountrySelect = ({ className, value, onChange, readonly }: CountrySelectProps) => {
  const { t } = useTranslation('profile')

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country)
  }, [onChange])

  const props = {
    className,
    value,
    defaultValue: t('Specify the country'),
    items: options,
    onChange: onChangeHandler,
    readonly,
    direction: 'top right' as const,
    label: t('Specify the country')
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<ListBox {...props} />}
      off={<ListBoxDeprecated {...props} />}
    />
  )
}
