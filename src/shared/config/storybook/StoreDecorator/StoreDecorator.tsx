import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
// eslint-disable-next-line path-checker/public-api-imports
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice'
// eslint-disable-next-line path-checker/public-api-imports
import { addCommentFormReducer } from '@/features/addCommentForm/model/slices/addCommentFormSlice'
// eslint-disable-next-line path-checker/public-api-imports
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice'
// eslint-disable-next-line path-checker/public-api-imports
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice'
// eslint-disable-next-line path-checker/public-api-imports
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices'
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: ReducerList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer
}

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducerList
) => (StoryComponent: Story
) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
)
