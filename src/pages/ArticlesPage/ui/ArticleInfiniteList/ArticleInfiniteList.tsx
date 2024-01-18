import { ArticleList } from 'entities/Article'
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import { getArticles } from '../../model/slices/articlesPageSlice'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Text, TextSize } from 'shared/ui/Text/Text'

interface ArticleInfiniteListProps {
  className?: string
}

export const ArticleInfiniteList = (props: ArticleInfiniteListProps) => {
  const { className } = props
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  const error = useSelector(getArticlesPageError)
  const { t } = useTranslation('article')

  if (error) {
    return <Text text={t('Error loading the article')} size={TextSize.L} />
  }

  return (
    <ArticleList
      isLoading={isLoading}
      view={view}
      articles={articles}
      className={className}
    />
  )
}
