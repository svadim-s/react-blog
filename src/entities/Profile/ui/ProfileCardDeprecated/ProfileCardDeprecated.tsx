import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileCardDeprecated.module.scss'
import { ProfileCardProps } from '../ProfileCard/ProfileCard'
import { useTranslation } from 'react-i18next'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { CountrySelect } from '@/entities/Country'
import { CurrencySelect } from '@/entities/Currency'
import { Loader } from '@/shared/ui/deprecated/Loader'
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Text as TextDeprecated, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text'

export const ProfileCardDeprecatedLoader = () => {
  return (
    <HStack justify='center' max className={classNames(cls.ProfileCard, {}, [cls.loading])}>
      <Loader />
    </HStack>
  )
}

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('profile')

  return (
    <HStack justify='center' max className={classNames(cls.ProfileCard, {}, [cls.error])}>
      <TextDeprecated
        theme={TextTheme.ERROR}
        title={t('Произошла ошибка при загрузке профиля')}
        text={t('Попробуйте обновить страницу')}
        align={TextAlign.CENTER}
      />
    </HStack>
  )
}

export const ProfileCardDeprecated = (props: ProfileCardProps) => {
  const {
    className,
    data,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry
  } = props
  const { t } = useTranslation('profile')

  const mods: Mods = {
    [cls.editing]: !readonly
  }

  return (
    <VStack gap='8' max className={classNames(cls.ProfileCard, mods, [className])}>
      {data?.avatar &&
      <HStack justify='center' max className={cls.avatarWrapper}>
        <AvatarDeprecated src={data?.avatar} />
      </HStack>
      }
      <InputDeprecated
        value={data?.first}
        placeholder={t('Ваше имя')}
        className={cls.input}
        onChange={onChangeFirstname}
        readonly={readonly}
        data-testid='ProfileCard.firstname'
      />
      <InputDeprecated
        value={data?.lastname}
        placeholder={t('Ваша фамилия')}
        className={cls.input}
        onChange={onChangeLastname}
        readonly={readonly}
        data-testid='ProfileCard.lastname'
      />
      <InputDeprecated
        value={data?.age}
        placeholder={t('Ваш возраст')}
        className={cls.input}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.city}
        placeholder={t('Город')}
        className={cls.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.username}
        placeholder={t('Введите имя пользователя')}
        className={cls.input}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.avatar}
        placeholder={t('Введите ссылку на аватар')}
        className={cls.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        className={cls.input}
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </VStack>
  )
}
