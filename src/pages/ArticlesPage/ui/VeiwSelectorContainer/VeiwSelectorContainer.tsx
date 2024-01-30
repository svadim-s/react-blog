import { ArticleViewSelector } from '@/features/ArticleViewSelector'
import { useArticleFilters } from '../../lib/hooks/useArticleFilters'

interface VeiwSelectorContainerProps {
  className?: string
}

export const VeiwSelectorContainer = (props: VeiwSelectorContainerProps) => {
  const { className } = props
  const { view, onChangeView } = useArticleFilters()

  return (
    <ArticleViewSelector className={className} view={view} onViewClick={onChangeView} />
  )
}
