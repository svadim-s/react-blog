import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import ListIconDeprecated from '@/shared/assets/icons/list.svg'
import TiledIconDeprecated from '@/shared/assets/icons/tiled.svg'

import ListIcon from '@/shared/assets/icons/burger.svg'
import TiledIcon from '@/shared/assets/icons/tile.svg'

import cls from './ArticleViewSelector.module.scss'
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button'
import { ArticleView } from '@/entities/Article'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Card } from '@/shared/ui/redesigned/Card'
import { HStack } from '@/shared/ui/redesigned/Stack'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.TILE,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => TiledIcon,
      off: () => TiledIconDeprecated
    })
  },
  {
    view: ArticleView.LIST,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated
    })
  }
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView)
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card
          className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])}
          border='round'
        >
          <HStack gap='8'>
            {viewTypes.map((viewType) => (
              <Icon
                clickable
                onClick={onClick(viewType.view)}
                key={viewType.view}
                Svg={viewType.icon}
                className={classNames('', { [cls.notSelected]: viewType.view !== view })}
              />
            ))}
          </HStack>
        </Card>
      }
      off={
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
          {viewTypes.map((viewType) => (
            <ButtonDeprecated
              key={viewType.view}
              theme={ThemeButton.CLEAR}
              onClick={onClick(viewType.view)}
            >
              <IconDeprecated
                width={24}
                height={24}
                Svg={viewType.icon}
                className={classNames('', { [cls.notSelected]: viewType.view !== view })}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
    />
  )
})
