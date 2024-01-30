import { ArticlesFilters } from '@/widgets/ArticlesFilters'
import { useArticleFilters } from '../../lib/hooks/useArticleFilters'
import { memo } from 'react'

interface FiltersContainerProps {
  className?: string
}

export const FiltersContainer = memo(({ className }: FiltersContainerProps) => {
  const {
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    order,
    search,
    sort,
    type
  } = useArticleFilters()

  return (
    <ArticlesFilters
      onChangeOrder={onChangeOrder}
      onChangeSearch={onChangeSearch}
      onChangeSort={onChangeSort}
      onChangeType={onChangeType}
      order={order}
      search={search}
      sort={sort}
      type={type}
      className={className}
    />
  )
})
