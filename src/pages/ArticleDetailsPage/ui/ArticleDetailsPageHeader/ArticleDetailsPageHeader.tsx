import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails'
import { getUserAuthData } from 'entities/User'
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article'
import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { HStack } from 'shared/ui/Stack'

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
    navigate(RoutePath.articles)
  }, [navigate])

  const onEditArticle = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    navigate(`${RoutePath.article_details}${article?.id}/edit`)
  }, [article?.id, navigate])

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
