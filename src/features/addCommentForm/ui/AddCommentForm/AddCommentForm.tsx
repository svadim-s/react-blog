import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button'
import { Button } from '@/shared/ui/redesigned/Button'
import cls from './AddCommentForm.module.scss'
import { memo, useCallback } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Input } from '@/shared/ui/redesigned/Input'
import { ToggleFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/redesigned/Card'

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducerList = {
  addCommentForm: addCommentFormReducer
}

const AddCommentForm = memo(({ className, onSendComment }: AddCommentFormProps) => {
  const { t } = useTranslation('comment')
  const text = useSelector(getAddCommentFormText)
  const error = useSelector(getAddCommentFormError)
  const dispatch = useAppDispatch()

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value))
  }, [dispatch])

  const onSendHandler = useCallback(() => {
    onSendComment(text || '')
    onCommentTextChange('')
  }, [onCommentTextChange, text, onSendComment])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <Card padding='24' border='partial' max>
            <HStack
              data-testid='AddCommentForm'
              justify='between'
              max
              gap='16'
              className={classNames(cls.AddCommentFormRedesigned, {}, [className])}
            >
              <Input
                data-testid='AddCommentForm.Input'
                className={cls.input}
                placeholder={t('Enter comment text')}
                value={text}
                onChange={onCommentTextChange}
              />
              <Button
                data-testid='AddCommentForm.Button'
                onClick={onSendHandler}
              >
                {t('Send')}
              </Button>
            </HStack>
          </Card>
        }
        off={
          <HStack
            data-testid='AddCommentForm'
            justify='between'
            max
            className={classNames(cls.AddCommentForm, {}, [className])}
          >
            <InputDeprecated
              data-testid='AddCommentForm.Input'
              className={cls.input}
              placeholder={t('Enter comment text')}
              value={text}
              onChange={onCommentTextChange}
            />
            <ButtonDeprecated
              data-testid='AddCommentForm.Button'
              theme={ThemeButton.OUTLINE}
              onClick={onSendHandler}
            >
              {t('Send')}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  )
})

export default AddCommentForm
