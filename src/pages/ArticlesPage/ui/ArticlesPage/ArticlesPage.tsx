import { articlesPageReducer } from '../../model/slices/articlesPageSlice'
import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import cls from './ArticlesPage.module.scss'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from '@/widgets/Page'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList'
import { ArticlePageGreeting } from '@/features/articlePageGreeting'
import { ToggleFeatures } from '@/shared/lib/features'
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout'
import { VeiwSelectorContainer } from '../VeiwSelectorContainer/VeiwSelectorContainer'
import { FiltersContainer } from '../FiltersContainer/FiltersContainer'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducerList = {
  articlesPage: articlesPageReducer
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props
  const dispatch = useAppDispatch()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  const content = (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <StickyContentLayout
          left={<VeiwSelectorContainer />}
          right={<FiltersContainer />}
          content={
            <Page
              data-testid='ArticlesPage'
              onScrollEnd={onLoadNextPart}
              className={classNames(cls.ArticlesPageRedesiged, {}, [className])}
            >
              <ArticleInfiniteList className={cls.list} />
              <ArticlePageGreeting />
            </Page>
          }
        />
      }
      off={
        <Page
          data-testid='ArticlesPage'
          onScrollEnd={onLoadNextPart}
          className={classNames(cls.ArticlesPage, {}, [className])}
        >
          <ArticlesPageFilters />
          <ArticleInfiniteList className={cls.list} />
          <ArticlePageGreeting />
        </Page>
      }
    />
  )

  return (
    <DynamicModuleLoader removeAfterUnmount={false} reducers={reducers}>
      {content}
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
