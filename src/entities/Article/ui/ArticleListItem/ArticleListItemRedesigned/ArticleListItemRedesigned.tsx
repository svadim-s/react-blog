import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleListItemRedesigned.module.scss'
import { ArticleListItemProps } from '../ArticleListItem'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Text } from '@/shared/ui/redesigned/Text'
import { useTranslation } from 'react-i18next'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { ArticleTextBlock } from '../../../model/types/article'
import { ArticleView, ArticleBlockType } from '../../../model/consts/articleConsts'
import EyeIcon from '@/shared/assets/icons/eye.svg'
import { Card } from '@/shared/ui/redesigned/Card'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { getRouteArticleDetails } from '@/shared/const/router'
import { Button } from '@/shared/ui/redesigned/Button'
import { memo } from 'react'

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
    target
  } = props

  const { t } = useTranslation('article')

  const types = <Text text={article.type.join(', ')} className={cls.types} />
  const views = (
    <HStack gap='8'>
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.view} />
    </HStack>
  )

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      block => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock

    return (
      <Card
        padding='24'
        max
        data-testid='ArticleListItem'
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <VStack max gap='16'>
          <HStack gap='8' max>
            <Avatar size={32} src={article.user.avatar} />
            <Text bold text={article.user.username} />
            <Text text={article.createdAt} />
          </HStack>
          <Text title={article.title} bold />
          <Text title={article.subtitle} size='s' />
          <AppImage
            fallback={<Skeleton width='100%' height={250} />}
            src={article.img}
            alt={article.title}
            className={cls.img}
          />
          {textBlock?.paragraphs && (
            <Text text={textBlock.paragraphs.slice(0, 2).join(' ')} className={cls.textBlock} />
          )}
          <HStack max justify='between'>
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
              <Button variant='outline'>
                {t('Read more')}
              </Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    )
  }

  return (
    <AppLink
      data-testid='ArticleListItem'
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <AppImage
            fallback={<Skeleton width={200} height={200} />}
            alt={article.title}
            src={article.img}
            className={cls.img}
          />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  )
})
