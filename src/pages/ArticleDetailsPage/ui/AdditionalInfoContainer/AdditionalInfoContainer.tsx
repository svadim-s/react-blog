import { getArticleDetailsData } from '@/entities/Article'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo'
import { useSelector } from 'react-redux'
import cls from './AdditionalInfoContainer.module.scss'
import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRouteArticleEdit } from '@/shared/const/router'

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticleDetailsData)
  const navigate = useNavigate()

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id))
    }
  }, [article, navigate])

  if (!article) {
    return null
  }

  return (
    <Card padding='24' border='partial' className={cls.card}>
      <ArticleAdditionalInfo
        onEdit={onEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  )
})
