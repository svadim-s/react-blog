import { CommentList } from '@/entities/Comment'
import { AddCommentForm } from '@/features/addCommentForm'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { Suspense, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { TextSize, Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { useInitialEffect } from '@/shared/lib/hooks/useInitilaEffect/useInitialEffect'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/deprecated/Skeleton'
import { ToggleFeatures } from '@/shared/lib/features'

interface ArticleDetailsCommentsProps {
  className?: string
  id?: string
}

export const ArticleDetailsComments = (props: ArticleDetailsCommentsProps) => {
  const { className, id } = props
  const { t } = useTranslation()
  const comments = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const dispatch = useAppDispatch()

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  return (
    <VStack gap='16' max className={classNames('', {}, [className])}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <Text
            size='l'
            title={t('Comments')}
          />
        }
        off={
          <TextDeprecated
            size={TextSize.L}
            title={t('Comments')}
          />
        }
      />
      <Suspense fallback={<Skeleton />}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </VStack>
  )
}
