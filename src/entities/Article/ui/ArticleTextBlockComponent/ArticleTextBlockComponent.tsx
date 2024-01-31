import { ArticleTextBlock } from '../../model/types/article'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleTextBlockComponent.module.scss'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { ToggleFeatures } from '@/shared/lib/features'

interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(({ className, block }: ArticleTextBlockComponentProps) => {
  return (
    <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
      {block.title && (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={
            <Text
              title={block.title}
              className={cls.title}
            />
          }
          off={
            <TextDeprecated
              title={block.title}
              className={cls.title}
            />
          }
        />
      )}
      {block.paragraphs.map((paragraph, index) => (
        <ToggleFeatures
          key={index}
          feature='isAppRedesigned'
          on={
            <Text
              key={paragraph}
              text={paragraph}
              className={cls.paragraph}
            />
          }
          off={
            <TextDeprecated
              key={paragraph}
              text={paragraph}
              className={cls.paragraph}
            />
          }
        />
      ))}
    </div>
  )
})
