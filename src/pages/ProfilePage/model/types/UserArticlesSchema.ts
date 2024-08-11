import { EntityState } from '@reduxjs/toolkit'
import { Article, ArticleSortField, ArticleType } from '@/entities/Article'
import { SortOrder } from '@/shared/types/sort'

export interface UserArticlesSchema extends EntityState<Article> {
  isLoading?: boolean
  error?: string

  // pagination
  page: number
  limit?: number
  hasMore: boolean

  // filters
  order: SortOrder
  sort: ArticleSortField
  search: string
  type: ArticleType

  _inited: boolean
}
