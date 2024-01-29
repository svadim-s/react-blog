import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/deprecated/Text'
import { CommentCard } from '../CommentCard/CommentCard'
import { Comment } from '../../model/types/comment'
import { VStack } from '@/shared/ui/deprecated/Stack'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList = (props: CommentListProps) => {
  const { t } = useTranslation()
  const {
    className,
    comments,
    isLoading
  } = props

  if (isLoading) {
    return (
      <VStack gap='16' max className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    )
  }

  return (
    <VStack gap='16' max className={classNames('', {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard
            isLoading={isLoading}
            key={comment.id}
            comment={comment}
          />
        ))
        : <Text text={t('Комментарии отсутсвуют')} />
      }
    </VStack>
  )
}
