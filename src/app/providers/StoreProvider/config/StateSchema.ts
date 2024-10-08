import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { ArticleDetailsSchema } from '@/entities/Article'
import { CounterSchema } from '@/entities/Counter'
import { ProfileSchema } from '@/entities/Profile'
import { UserSchema } from '@/entities/User'
import { AddCommentFormSchema } from '@/features/addCommentForm'
import { LoginSchema } from '@/features/AuthByUsername'
import { ScrollSafeSchema } from '@/features/ScrollSafe'
import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage'
import { ArticlesPageSchema } from '@/pages/ArticlesPage'
import { rtkApi } from '@/shared/api/rtkApi'
import { UserArticlesSchema } from '@/pages/ProfilePage'
export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  scrollSafe: ScrollSafeSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  // Асинхронные редюсеры
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlesPageSchema
  articleDetailsPage?: ArticleDetailsPageSchema
  userArticles?: UserArticlesSchema
  // userArticles?: UserArticlesState
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void

  // true - вмонтирован, false - демонтирован
  getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
