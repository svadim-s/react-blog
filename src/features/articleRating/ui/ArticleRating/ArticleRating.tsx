import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { RatingCard } from '@/entities/Rating'
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

export interface ArticleRatingProps {
  className?: string
  articleId: string
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props
  const { t } = useTranslation('article')
  const userData = useSelector(getUserAuthData)
  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? ''
  })
  const [rateArticleMutation] = useRateArticle()

  const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
    try {
      rateArticleMutation({
        userId: userData?.id ?? '',
        articleId,
        rate: starsCount,
        feedback
      })
    } catch (e) {
      console.log(e)
    }
  }, [articleId, rateArticleMutation, userData?.id])

  const onAccept = useCallback((starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback)
  }, [handleRateArticle])

  const onCancel = useCallback((starsCount: number) => {
    handleRateArticle(starsCount)
  }, [handleRateArticle])

  if (isLoading) {
    return <Skeleton height={120} width='100%' />
  }

  const rating = data?.[0]

  return (
    <RatingCard
      className={className}
      title={t('Rate this article')}
      feedbackTitle={t('Leave your feedback on the article, this will help improve the quality')}
      hasFeedback
      rate={rating?.rate}
      onAccept={onAccept}
      onCancel={onCancel}
    />
  )
})

export default ArticleRating
