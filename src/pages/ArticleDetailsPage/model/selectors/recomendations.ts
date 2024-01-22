import { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleRecommendationsIsLoading = (state: StateSchema) => state.articleDetailsPage?.recommnedations?.isLoading
export const getArticleRecommendationsError = (state: StateSchema) => state.articleDetailsPage?.recommnedations?.error
