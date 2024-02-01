import { getUserAuthData } from '@/entities/User'
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { profileActions } from '../../model/slice/profileSlice'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button'
import { Button } from '@/shared/ui/redesigned/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { ToggleFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/redesigned/Card'

interface EditableProfileCardHeaderProps {
  className?: string
}

export const EditableProfileCardHeader = ({ className }: EditableProfileCardHeaderProps) => {
  const { t } = useTranslation('profile')
  const authData = useSelector(getUserAuthData)
  const profileData = useSelector(getProfileData)
  const canEdit = authData?.id === profileData?.id
  const dispatch = useAppDispatch()
  const readonly = useSelector(getProfileReadonly)

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSaveEdit = useCallback(() => {
    dispatch(updateProfileData())
  }, [dispatch])

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card border='partial' padding='24' max>
          <HStack max justify='between' className={classNames('', {}, [className])}>
            <Text title={t('Профиль')} />
            {canEdit && (
              <>
                {readonly
                  ? (
                    <Button
                      onClick={onEdit}
                      data-testid='EditableProfileCardHeader.EditButton'
                    >
                      {t('Редактировать')}
                    </Button>)
                  : (
                    <HStack gap='8'>
                      <Button
                        onClick={onCancelEdit}
                        data-testid='EditableProfileCardHeader.CancelButton'
                        color='error'
                      >
                        {t('Отменить')}
                      </Button>
                      <Button
                        onClick={onSaveEdit}
                        data-testid='EditableProfileCardHeader.SaveButton'
                        color='success'
                      >
                        {t('Сохранить')}
                      </Button>
                    </HStack>)
                }
              </>
            )}
          </HStack>
        </Card>
      }
      off={
        <HStack max justify='between' className={classNames('', {}, [className])}>
          <TextDeprecated title={t('Профиль')} />
          {canEdit && (
            <>
              {readonly
                ? (
                  <ButtonDeprecated
                    theme={ThemeButton.OUTLINE}
                    onClick={onEdit}
                    data-testid='EditableProfileCardHeader.EditButton'
                  >
                    {t('Редактировать')}
                  </ButtonDeprecated>)
                : (
                  <HStack gap='8'>
                    <ButtonDeprecated
                      theme={ThemeButton.OUTLINE_RED}
                      onClick={onCancelEdit}
                      data-testid='EditableProfileCardHeader.CancelButton'
                    >
                      {t('Отменить')}
                    </ButtonDeprecated>
                    <ButtonDeprecated
                      theme={ThemeButton.OUTLINE}
                      onClick={onSaveEdit}
                      data-testid='EditableProfileCardHeader.SaveButton'
                    >
                      {t('Сохранить')}
                    </ButtonDeprecated>
                  </HStack>)
              }
            </>
          )}
        </HStack>
      }
    />
  )
}
