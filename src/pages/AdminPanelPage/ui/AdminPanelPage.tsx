import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { Page } from '@/widgets/Page'

interface AdminPanelPageProps {
  className?: string
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
  const { className } = props
  const { t } = useTranslation()

  return (
    <Page data-testid='AdminPanelPage' className={classNames('', {}, [className])}>
      {t('ADMIN PANEL')}
    </Page>
  )
})

export default AdminPanelPage
