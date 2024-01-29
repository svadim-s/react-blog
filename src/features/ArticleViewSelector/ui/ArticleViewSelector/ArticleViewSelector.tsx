import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import ListIcon from '@/shared/assets/icons/list.svg'
import TiledIcon from '@/shared/assets/icons/tiled.svg'
import cls from './ArticleViewSelector.module.scss'
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button'
import { ArticleView } from '@/entities/Article'
import { Icon } from '@/shared/ui/deprecated/Icon'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.TILE,
    icon: TiledIcon
  },
  {
    view: ArticleView.LIST,
    icon: ListIcon
  }
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView)
  }

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          key={viewType.view}
          theme={ThemeButton.CLEAR}
          onClick={onClick(viewType.view)}
        >
          <Icon
            width={24}
            height={24}
            Svg={viewType.icon}
            className={classNames('', { [cls.notSelected]: viewType.view !== view })}
          />
        </Button>
      ))}
    </div>
  )
})
