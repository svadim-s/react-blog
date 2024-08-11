import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article, ArticleType } from '@/entities/Article'
import {
  getUserArticlesLimit,
  getUserArticlesOrder,
  getUserArticlesPageNum,
  getUserArticlesSearch,
  getUserArticlesSort,
  getUserArticlesType
} from '../selectors/userArticlesSelector'

export const fetchUserArticles = createAsyncThunk<
Article[],
string,
ThunkConfig<string>
>(
  'profile/fetchUserArticles',
  async (userId, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi
    const limit = getUserArticlesLimit(getState())
    const sort = getUserArticlesSort(getState())
    const order = getUserArticlesOrder(getState())
    const search = getUserArticlesSearch(getState())
    const page = getUserArticlesPageNum(getState())
    const type = getUserArticlesType(getState())

    try {
      const response = await extra.api.get<Article[]>(`/articles?userId=${userId}`, {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
          type: type === ArticleType.ALL ? undefined : type
        }
      })

      if (!response.data) {
        throw new Error()
      }

      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  }
)
