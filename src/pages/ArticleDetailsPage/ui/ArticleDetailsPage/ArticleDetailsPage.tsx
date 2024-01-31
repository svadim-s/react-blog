import { ArticleDetails } from '@/entities/Article'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import cls from './ArticleDetailsPage.module.scss'
import { Page } from '@/widgets/Page'
import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'
import { ArticleRating } from '@/features/articleRating'
import { ToggleFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/deprecated/Card'
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout'
import { DetailsContainer } from '../DetailsContainer/DetailsContainer'
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article')
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return null
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <StickyContentLayout
            content={
              <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <VStack gap='16' max>
                  <DetailsContainer />
                  <ArticleRating articleId={id} />
                  <ArticleRecommendationsList />
                  <ArticleDetailsComments id={id} />
                </VStack>
              </Page>
            }
            right={<AdditionalInfoContainer />}
          />
        }
        off={
          <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap='16' max>
              <ArticleDetailsPageHeader />
              <ArticleDetails id={id} />
              <ToggleFeatures
                feature='isArticleRatingEnabled'
                on={<ArticleRating articleId={id} />}
                off={<Card>{t('The evaluation of the articles will appear soon')}</Card>}
              />
              <ArticleRecommendationsList />
              <ArticleDetailsComments id={id} />
            </VStack>
          </Page>
        }
      />
    </DynamicModuleLoader>
  )
})

export default memo(ArticleDetailsPage)
