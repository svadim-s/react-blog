import { getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import cls from './ProfilePageHeader.module.scss'

interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation('profile')
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
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')} />
      {readonly
        ? (
          <Button
            className={cls.editBtn}
            theme={ThemeButton.OUTLINE}
            onClick={onEdit}
          >
            {t('Редактировать')}
          </Button>)
        : (
          <>
            <Button
              className={cls.editBtn}
              theme={ThemeButton.OUTLINE_RED}
              onClick={onCancelEdit}
            >
              {t('Отменить')}
            </Button>
            <Button
              className={cls.saveBtn}
              theme={ThemeButton.OUTLINE}
              onClick={onSaveEdit}
            >
              {t('Сохранить')}
            </Button>
          </>)
      }
    </div>
  )
}
