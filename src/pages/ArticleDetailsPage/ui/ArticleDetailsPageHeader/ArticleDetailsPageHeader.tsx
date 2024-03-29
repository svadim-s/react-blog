import { getArticleDetailsData } from '@/entities/Article'
import { getUserAuthData } from '@/entities/User'
import { getCanEditArticle } from '../../model/selectors/article'
import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
  const { className } = props
  const navigate = useNavigate()
  const { t } = useTranslation()
  const userData = useSelector(getUserAuthData)
  const article = useSelector(getArticleDetailsData)
  const canEdit = useSelector(getCanEditArticle)

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles())
  }, [navigate])

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id))
    }
  }, [article, navigate])

  return (
    <HStack max justify='between' className={classNames('', {}, [className])}>
      <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
        {t('Назад к списку статей')}
      </Button>
      {canEdit &&
        <Button
          theme={ThemeButton.OUTLINE}
          onClick={onEditArticle}
        >
          {t('Edit')}
        </Button>
      }
    </HStack>
  )
})
