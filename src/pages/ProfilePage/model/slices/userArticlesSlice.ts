import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { fetchUserArticles } from '../services/fetchUserArticles'
import { Article, ArticleSortField, ArticleType } from '@/entities/Article'
import { StateSchema } from '@/app/providers/StoreProvider'
import { UserArticlesSchema } from '../types/UserArticlesSchema'
import { SortOrder } from '@/shared/types/sort'

// export interface UserArticlesState {
//   userArticles: Article[]
//   loading: boolean
//   error: string | undefined
// }

// const initialState: UserArticlesState = {
//   userArticles: [],
//   loading: false,
//   error: undefined
// }

const userArticlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id
})

export const getUserArticles = userArticlesAdapter.getSelectors<StateSchema>(
  (state) => state.userArticles || userArticlesAdapter.getInitialState()
)

const userArticlesSlice = createSlice({
  name: 'userArticles',
  initialState: userArticlesAdapter.getInitialState<UserArticlesSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    page: 1,
    hasMore: true,
    _inited: false,
    limit: 4,
    sort: ArticleSortField.CREATED,
    search: '',
    order: 'asc',
    type: ArticleType.ALL
  }),
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    initState: (state) => {
      state.limit = 4
      state._inited = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserArticles.pending, (state, action) => {
        state.isLoading = true
        state.error = undefined

        if (!action.meta.arg) {
          userArticlesAdapter.removeAll(state)
        }
      })
      .addCase(fetchUserArticles.fulfilled, (
        state,
        action
      ) => {
        state.isLoading = false
        state.hasMore = action.payload.length >= (state.limit ?? 0)

        userArticlesAdapter.addMany(state, action.payload)
      })
      .addCase(fetchUserArticles.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const {
  reducer: userArticlesReducer,
  actions: userArticlesActions
} = userArticlesSlice
