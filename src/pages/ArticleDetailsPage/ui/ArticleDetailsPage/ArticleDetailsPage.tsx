import { ArticleDetails } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { articelDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Text } from 'shared/ui/Text/Text'
import cls from './ArticleDetailsPage.module.scss'
import { useSelector } from 'react-redux'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { useInitialEffect } from 'shared/lib/hooks/useInitilaEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import AddCommentForm from 'features/addCommentForm/ui/AddCommentForm/AddCommentForm'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Page } from 'shared/ui/Page/Page'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducerList = {
  articleDetailsComments: articelDetailsCommentsReducer
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article')
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Article not found')}
      </Page>
    )
  }
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
          {t('Назад к списку статей')}
        </Button>
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle} title={t('Comments')} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
