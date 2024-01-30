import { Card } from '@/shared/ui/deprecated/Card'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/deprecated/Text'
import { memo, useCallback, useState } from 'react'
import { StarRating } from '@/shared/ui/deprecated/StarRating'
import { useTranslation } from 'react-i18next'
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/deprecated/Button'
import { BrowserView, MobileView } from 'react-device-detect'
import { Input } from '@/shared/ui/deprecated/Input'
import { Modal } from '@/shared/ui/deprecated/Modal'
import { Drawer } from '@/shared/ui/deprecated/Drawer'

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
    <>
      <Text title={feedbackTitle} />
      <Input
        data-testid='RatingCard.Input'
        value={feedback}
        onChange={setFeedback}
        placeholder={t('Your feedback')}
      />
    </>
  )

  return (
    <Card data-testid='RatingCard' className={className} max>
      <VStack align='center' gap='8' max>
        <Text title={starsCount ? t('Thanks for your feedback') : title} />
        <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack gap='32' max>
            {modalContent}
            <HStack max gap='16' justify='end'>
              <Button
                data-testid='RatingCard.Close'
                onClick={cancelHandler}
                theme={ThemeButton.OUTLINE_RED}
              >
                {t('Close')}
              </Button>
              <Button data-testid='RatingCard.Send' onClick={acceptHandler}>
                {t('Send')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
          <VStack gap='32' max>
            {modalContent}
            <Button fullWidth onClick={acceptHandler} size={ButtonSize.L}>
              {t('Send')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  )
})
