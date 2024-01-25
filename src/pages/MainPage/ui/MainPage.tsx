import { Page } from '@/widgets/Page'
import React from 'react'
import { useTranslation } from 'react-i18next'

const MainPage = () => {
  const { t } = useTranslation('main')

  return (
    <Page data-testid='MainPage'>
      {t('Главная страница')}
    </Page>
  )
}

export default MainPage
