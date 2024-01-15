import { ArticleDetailsCommentSchema } from './ArticleDetailsCommentSchema'
import { ArticleDetailsRecommendationsSchema } from './ArticleDetailsRecommendationsSchema'

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentSchema
  recommnedations: ArticleDetailsRecommendationsSchema
}
