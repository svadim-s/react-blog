import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { EditableProfileCard } from '@/features/editableProfileCard'
import { useParams } from 'react-router-dom'
import { useCallback } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { getUserArticlesError, getUserArticlesIsLoading } from '../model/selectors/userArticlesSelector'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { getUserArticles, userArticlesReducer } from '../model/slices/userArticlesSlice'
import { ArticleList, ArticleView } from '@/entities/Article'
import { fetchNextUserArticles } from '../model/services/fetchNextUserArticles'

interface ProfilePageProps {
  className?: string
}

const reducers: ReducerList = {
  userArticles: userArticlesReducer
}

const ProfilePage = (props: ProfilePageProps) => {
  const {
    className
  } = props
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const userArticles = useSelector(getUserArticles.selectAll)
  const loading = useSelector(getUserArticlesIsLoading)
  const error = useSelector(getUserArticlesError)

  const onLoadNextPart = useCallback(() => {
    if (id) {
      dispatch(fetchNextUserArticles(id))
    }
  }, [dispatch, id])

  return (
    <DynamicModuleLoader removeAfterUnmount={false} reducers={reducers}>
      <Page data-testid='ProfilePage' className={classNames('', {}, [className])} onScrollEnd={onLoadNextPart}>
        <VStack max gap='16'>
          <EditableProfileCard id={id} />
          <h2>Статьи пользователя:</h2>
        </VStack>
        <ArticleList
          isLoading={loading}
          view={ArticleView.LIST}
          articles={userArticles}
          className={className}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
