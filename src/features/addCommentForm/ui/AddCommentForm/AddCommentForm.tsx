import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button'
import cls from './AddCommentForm.module.scss'
import { memo, useCallback } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Input } from '@/shared/ui/deprecated/Input'

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
      <HStack
        data-testid='AddCommentForm'
        justify='between'
        max
        className={classNames(cls.AddCommentForm, {}, [className])}
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
          theme={ThemeButton.OUTLINE}
          onClick={onSendHandler}
        >
          {t('Send')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  )
})

export default AddCommentForm
