import { combineReducers } from '@reduxjs/toolkit'
import { ArticleDetailsPageSchema } from '../types'
import { articelDetailsCommentsReducer } from './articleDetailsCommentsSlice'
import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice'

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  recommnedations: articleDetailsPageRecommendationsReducer,
  comments: articelDetailsCommentsReducer
})
