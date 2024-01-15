import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { Page } from 'widgets/Page/Page'

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const { t } = useTranslation('article')

  return (
    <Page className={classNames('', {}, [className])}>
      {isEdit
        ? t(`Editing an article with an id = ${id as string}`)
        : t('Creating a new article')
      }
    </Page>
  )
})

export default ArticleEditPage
