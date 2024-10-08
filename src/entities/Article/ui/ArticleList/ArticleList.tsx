import { Article } from '../../model/types/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { HTMLAttributeAnchorTarget, memo } from 'react'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { Text, TextSize } from '@/shared/ui/deprecated/Text'
import { useTranslation } from 'react-i18next'
import { ArticleView } from '../../model/consts/articleConsts'
import { ToggleFeatures } from '@/shared/lib/features'
import { HStack } from '@/shared/ui/redesigned/Stack'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
  target?: HTMLAttributeAnchorTarget
}

export const getSkeletons = (view: ArticleView) => {
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
    view = ArticleView.TILE,
    isLoading,
    target
  } = props
  const { t } = useTranslation()

  if (!isLoading && !articles.length) {
    return (
      <div
        className={classNames(cls.ArticleList, {}, [
          className,
          cls[view]
        ])}
      >
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    )
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <HStack
          gap='16'
          wrap='wrap'
          className={classNames(cls.ArticleListRedesigned, {}, [])}
          data-testid="ArticleList"
        >
          {articles.map((item) => (
            <ArticleListItem
              article={item}
              view={view}
              target={target}
              key={item.id}
              className={cls.card}
            />
          ))}
          {isLoading && getSkeletons(view)}
        </HStack>
      }
      off={
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
          data-testid="ArticleList"
        >
          {articles.map((item) => (
            <ArticleListItem
              article={item}
              view={view}
              target={target}
              key={item.id}
              className={cls.card}
            />
          ))}
          {isLoading && getSkeletons(view)}
        </div>
      }
    />
  )
})
