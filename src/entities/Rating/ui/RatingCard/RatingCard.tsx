import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { memo, useCallback, useState } from 'react'
import { StarRating as StarRatingDeprecated } from '@/shared/ui/deprecated/StarRating'
import { StarRating } from '@/shared/ui/redesigned/StarRating'
import { useTranslation } from 'react-i18next'
import { Button as ButtonDeprecated, ButtonSize, ThemeButton } from '@/shared/ui/deprecated/Button'
import { BrowserView, MobileView } from 'react-device-detect'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { Drawer } from '@/shared/ui/redesigned/Drawer'
import { ToggleFeatures } from '@/shared/lib/features'
import { Input } from '@/shared/ui/redesigned/Input'
import { Button } from '@/shared/ui/redesigned/Button'
import { Card } from '@/shared/ui/redesigned/Card'

interface RatingCardProps {
  className?: string
  title?: string
  feedbackTitle?: string
  hasFeedback?: boolean
  onCancel?: (starsCount: number) => void
  onAccept?: (starsCount: number, feedback?: string) => void
  rate?: number
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    onAccept,
    rate = 0
  } = props
  const { t } = useTranslation()
  const [isModalOpen, setIsOpenModal] = useState(false)
  const [starsCount, setStarsCount] = useState(rate)
  const [feedback, setFeedback] = useState('')

  const onSelectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount)
    if (hasFeedback) {
      setIsOpenModal(true)
    } else {
      onAccept?.(selectedStarsCount)
    }
  }, [hasFeedback, onAccept])

  const acceptHandler = useCallback(() => {
    setIsOpenModal(false)
    onAccept?.(starsCount, feedback)
  }, [feedback, onAccept, starsCount])

  const cancelHandler = useCallback(() => {
    setIsOpenModal(false)
    onCancel?.(starsCount)
  }, [onCancel, starsCount])

  const modalContent = (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <>
          <Text title={feedbackTitle} />
          <Input
            data-testid='RatingCard.Input'
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Your feedback')}
          />
        </>
      }
      off={
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated
            data-testid='RatingCard.Input'
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Your feedback')}
          />
        </>
      }
    />
  )

  const content = (
    <>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <VStack align='center' gap='8' max>
            <Text
              title={starsCount ? t('Thanks for your feedback') : title}
            />
            <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
          </VStack>
        }
        off={
          <VStack align='center' gap='8' max>
            <TextDeprecated
              title={starsCount ? t('Thanks for your feedback') : title}
            />
            <StarRatingDeprecated selectedStars={starsCount} size={40} onSelect={onSelectStars} />
          </VStack>
        }
      />
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack gap='32' max>
            {modalContent}
            <ToggleFeatures
              feature='isAppRedesigned'
              on={
                <HStack max gap='16' justify='end'>
                  <Button
                    data-testid='RatingCard.Close'
                    onClick={cancelHandler}
                  >
                    {t('Close')}
                  </Button>
                  <Button data-testid='RatingCard.Send' onClick={acceptHandler}>
                    {t('Send')}
                  </Button>
                </HStack>
              }
              off={
                <HStack max gap='16' justify='end'>
                  <ButtonDeprecated
                    data-testid='RatingCard.Close'
                    onClick={cancelHandler}
                    theme={ThemeButton.OUTLINE_RED}
                  >
                    {t('Close')}
                  </ButtonDeprecated>
                  <ButtonDeprecated data-testid='RatingCard.Send' onClick={acceptHandler}>
                    {t('Send')}
                  </ButtonDeprecated>
                </HStack>
              }
            />
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
          <VStack gap='32' max>
            {modalContent}
            <ToggleFeatures
              feature='isAppRedesigned'
              on={
                <Button fullWidth onClick={acceptHandler} size='l'>
                  {t('Send')}
                </Button>
              }
              off={
                <ButtonDeprecated fullWidth onClick={acceptHandler} size={ButtonSize.L}>
                  {t('Send')}
                </ButtonDeprecated>
              }
            />
          </VStack>
        </Drawer>
      </MobileView>
    </>
  )

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card
          data-testid='RatingCard'
          className={className}
          max
          padding='24'
          border='round'
        >
          {content}
        </Card>
      }
      off={
        <CardDeprecated data-testid='RatingCard' className={className} max>
          {content}
        </CardDeprecated>
      }
    />
  )
})
