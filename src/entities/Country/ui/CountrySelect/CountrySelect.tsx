import { Country } from '../../model/types/country'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { useCallback } from 'react'
import { Select } from 'shared/ui/Select/Select'

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

  return (
    <Select
      className={classNames('', {}, [className])}
      label={t('Укажите страну')}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  )
}
