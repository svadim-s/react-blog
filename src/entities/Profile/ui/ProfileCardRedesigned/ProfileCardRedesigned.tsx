import { ProfileCardProps } from '../ProfileCard/ProfileCard'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/redesigned/Card'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Input } from '@/shared/ui/redesigned/Input'
import { CountrySelect } from '@/entities/Country'
import { CurrencySelect } from '@/entities/Currency'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { Text } from '@/shared/ui/redesigned/Text'

export const ProfileCardRedesignedSkeleton = () => {
  return (
    <Card padding='24' max>
      <VStack gap='32'>
        <HStack max justify='center'>
          <Skeleton border='100%' width={128} height={128} />
        </HStack>
        <HStack gap='32' max>
          <VStack gap='16' max>
            <Skeleton width='100%' height={38} />
            <Skeleton width='100%' height={38} />
            <Skeleton width='100%' height={38} />
            <Skeleton width='100%' height={38} />
          </VStack>

          <VStack gap='16' max>
            <Skeleton width='100%' height={38} />
            <Skeleton width='100%' height={38} />
            <Skeleton width='100%' height={38} />
            <Skeleton width='100%' height={38} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  )
}

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile')

  return (
    <HStack justify='center' max>
      <Text
        variant='error'
        title={t('Произошла ошибка при загрузке профиля')}
        text={t('Попробуйте обновить страницу')}
        align='center'
      />
    </HStack>
  )
}

export const ProfileCardRedesigned = (props: ProfileCardProps) => {
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

  return (
    <Card
      padding='24'
      border='partial'
      max
      className={className}
    >
      <VStack gap='32'>
        {data?.avatar &&
        <HStack justify='center' max>
          <Avatar size={128} src={data?.avatar} />
        </HStack>
        }
        <HStack gap='24' max>
          <VStack gap='16' max>
            <Input
              value={data?.first}
              label={t('Имя')}
              onChange={onChangeFirstname}
              readonly={readonly}
              data-testid='ProfileCard.firstname'
            />
            <Input
              value={data?.lastname}
              label={t('Фамилия')}
              onChange={onChangeLastname}
              readonly={readonly}
              data-testid='ProfileCard.lastname'
            />
            <Input
              value={data?.age}
              label={t('Возраст')}
              onChange={onChangeAge}
              readonly={readonly}
            />
            <Input
              value={data?.city}
              label={t('Город')}
              onChange={onChangeCity}
              readonly={readonly}
            />
          </VStack>
          <VStack gap='16' max>
            <Input
              value={data?.username}
              label={t('Имя пользователя')}
              onChange={onChangeUsername}
              readonly={readonly}
            />
            <Input
              value={data?.avatar}
              label={t('Cсылка на аватар')}
              onChange={onChangeAvatar}
              readonly={readonly}
            />
            <CurrencySelect
              value={data?.currency}
              onChange={onChangeCurrency}
              readonly={readonly}
            />
            <CountrySelect
              value={data?.country}
              onChange={onChangeCountry}
              readonly={readonly}
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  )
}
