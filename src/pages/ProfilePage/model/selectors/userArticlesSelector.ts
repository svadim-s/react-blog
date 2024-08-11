import { StateSchema } from '@/app/providers/StoreProvider'
import { ArticleSortField, ArticleType } from '@/entities/Article'

export const getUserArticlesIsLoading = (state: StateSchema) => state.userArticles?.isLoading || false
export const getUserArticlesError = (state: StateSchema) => state.userArticles?.error
// export const getUserArticles = createSelector(
//   (state: StateSchema) => state.userArticles?.userArticles || [],
//   (userArticles) => userArticles
// )
export const getUserArticlesPageNum = (state: StateSchema) => state.userArticles?.page || 1
export const getUserArticlesLimit = (state: StateSchema) => state.userArticles?.limit || 9
export const getUserArticlesHasMore = (state: StateSchema) => state.userArticles?.hasMore
export const getUserArticlesInited = (state: StateSchema) => state.userArticles?._inited
export const getUserArticlesOrder = (state: StateSchema) => state.userArticles?.order ?? 'asc'
export const getUserArticlesSort = (state: StateSchema) => state.userArticles?.sort ?? ArticleSortField.CREATED
export const getUserArticlesSearch = (state: StateSchema) => state.userArticles?.search ?? ''
export const getUserArticlesType = (state: StateSchema) => state.userArticles?.type ?? ArticleType.ALL
