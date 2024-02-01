import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './StarRating.module.scss'
import { Icon } from '../Icon'
import StarIcon from '../../../assets/icons/star.svg'
import { memo, useState } from 'react'

interface StarRatingProps {
  className?: string
  onSelect?: (starsCount: number) => void
  size?: number
  selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

export const StarRating = memo((props: StarRatingProps) => {
  const {
    className,
    size = 30,
    selectedStars = 0,
    onSelect
  } = props
  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars)
  const [isSelected, setisSelected] = useState(Boolean(selectedStars))

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount)
    }
  }

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0)
    }
  }

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount)
      setCurrentStarsCount(starsCount)
      setisSelected(true)
    }
  }

  return (
    <div className={classNames(cls.StarRating, {}, [className])}>
      {stars.map((starNumber) => {
        const commonProps = {
          className: classNames(
            cls.starIcon,
            { [cls.selected]: isSelected },
            [
              currentStarsCount >= starNumber
                ? cls.hovered
                : cls.normal
            ]
          ),
          Svg: StarIcon,
          width: size,
          height: size,
          onMouseLeave: onLeave,
          onMouseEnter: onHover(starNumber),
          onClick: onClick(starNumber),
          'data-testid': `StarRating.${starNumber}`,
          'data-selected': currentStarsCount >= starNumber
        }

        return (
          <Icon key={starNumber} clickable={!isSelected} {...commonProps} />
        )
      })}
    </div>
  )
})
