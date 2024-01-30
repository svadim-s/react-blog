import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/deprecated/Card'
import cls from './ArticlesPageFilters.module.scss'
import { ArticleSortSelector } from '@/features/ArticleSortSelector'
import { ArticleViewSelector } from '@/features/ArticleViewSelector'
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs'
import { Input } from '@/shared/ui/deprecated/Input'
import { useArticleFilters } from '../../lib/hooks/useArticleFilters'

interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters = ({ className }: ArticlesPageFiltersProps) => {
  const { t } = useTranslation('article')
  const {
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    onChangeView,
    order,
    search,
    sort,
    type,
    view
  } = useArticleFilters()

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input
          value={search}
          onChange={onChangeSearch}
          placeholder={t('Search')}
        />
      </Card>
      <ArticleTypeTabs
        value={type}
        onChangeType={onChangeType}
        className={cls.tabs}
      />
    </div>
  )
}
