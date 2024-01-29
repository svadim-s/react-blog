import { Article } from '../../model/types/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { HTMLAttributeAnchorTarget, memo } from 'react'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { Text, TextSize } from '@/shared/ui/deprecated/Text'
import { useTranslation } from 'react-i18next'
import { ArticleView } from '../../model/consts/articleConsts'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
  target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.TILE ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ))
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.TILE,
    target
  } = props
  const { t } = useTranslation('article')

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem
        article={article}
        view={view}
        className={cls.card}
        key={article.id}
        target={target}
      />
    )
  }

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('The article was not found')} />
      </div>
    )
  }

  return (
    <div data-testid='ArticleList' className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null
      }
      {isLoading && getSkeletons(view)}
    </div>
  )
})
