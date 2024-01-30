import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesFilters.module.scss'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleSortSelector } from '@/features/ArticleSortSelector'
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { useTranslation } from 'react-i18next'
import { ArticleSortField, ArticleType } from '@/entities/Article'
import { SortOrder } from '@/shared/types/sort'
import { Input } from '@/shared/ui/redesigned/Input'
import SearchIcon from '@/shared/assets/icons/search.svg'
import { Icon } from '@/shared/ui/redesigned/Icon'

interface ArticlesFiltersProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  type: ArticleType
  search: string
  onChangeSearch: (value: string) => void
  onChangeType: (type: ArticleType) => void
  onChangeOrder: (newOrder: SortOrder) => void
  onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticlesFilters = (props: ArticlesFiltersProps) => {
  const {
    className,
    sort,
    order,
    onChangeOrder,
    onChangeSort,
    type,
    onChangeSearch,
    search,
    onChangeType
  } = props
  const { t } = useTranslation()

  return (
    <Card className={classNames(cls.ArticlesFilters, {}, [className])} padding='24'>
      <VStack gap='32'>
        <Input
          value={search}
          onChange={onChangeSearch}
          placeholder={t('Search')}
          size='s'
          addonLeft={<Icon Svg={SearchIcon} />}
        />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleTypeTabs
          value={type}
          onChangeType={onChangeType}
          className={cls.tabs}
        />
      </VStack>
    </Card>
  )
}
