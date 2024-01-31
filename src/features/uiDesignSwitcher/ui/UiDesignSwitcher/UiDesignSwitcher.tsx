import { useTranslation } from 'react-i18next'
import { memo, useState } from 'react'
import { ListBox } from '@/shared/ui/redesigned/Popups'
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getUserAuthData } from '@/entities/User'
import { useSelector } from 'react-redux'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

interface UiDesignSwitcherProps {
  className?: string
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const authData = useSelector(getUserAuthData)
  const [isLoading, setIsLoading] = useState(false)

  const isAppRedesigned = getFeatureFlag('isAppRedesigned')

  const items = [
    {
      content: t('New'),
      value: 'new'
    },
    {
      content: t('Old'),
      value: 'old'
    }
  ]

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true)
      await dispatch(updateFeatureFlag({
        userId: authData?.id,
        newFeatures: {
          isAppRedesigned: value === 'new'
        }
      })).unwrap()
    }

    setIsLoading(false)
  }

  //   const onChange = (value: string) => {
  //     if (authData) {
  //       setIsLoading(true)
  //       updateFeature(value)
  //     }

  //     setIsLoading(false)
  //   }

  //   const updateFeature = async (value: string) => {
  //     if (authData) {
  //       await dispatch(updateFeatureFlag({
  //         userId: authData?.id,
  //         newFeatures: {
  //           isAppRedesigned: value === 'new'
  //         }
  //       })).unwrap()
  //     }
  //   }

  return (
    <HStack>
      <Text text={t('Interface option')} />
      {isLoading
        ? (
          <Skeleton width={100} height={40} />)
        : (
          <ListBox
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={onChange}
            items={items}
            value={isAppRedesigned ? 'new' : 'old'}
            className={className}
          />)
      }
    </HStack>
  )
})
