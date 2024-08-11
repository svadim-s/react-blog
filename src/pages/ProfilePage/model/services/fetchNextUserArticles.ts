import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { fetchUserArticles } from './fetchUserArticles'
import { getUserArticlesHasMore, getUserArticlesIsLoading, getUserArticlesPageNum } from '../selectors/userArticlesSelector'
import { userArticlesActions } from '../slices/userArticlesSlice'

export const fetchNextUserArticles = createAsyncThunk<
void,
string,
ThunkConfig<string>
>(
  'articlesPage/fetchNextArticlesPage',
  async (userId, thunkApi) => {
    const { getState, dispatch } = thunkApi
    const hasMore = getUserArticlesHasMore(getState())
    const page = getUserArticlesPageNum(getState())
    const isLoading = getUserArticlesIsLoading(getState())
    // const userId = getProfile(getState())

    if (hasMore && !isLoading) {
      dispatch(userArticlesActions.setPage(page + 1))
      dispatch(fetchUserArticles(userId))
    }
  }
)
