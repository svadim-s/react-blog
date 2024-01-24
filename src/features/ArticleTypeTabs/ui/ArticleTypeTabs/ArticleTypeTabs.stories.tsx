import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticleTypeTabs } from './ArticleTypeTabs'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'features/ArticleTypeTabs',
  component: ArticleTypeTabs,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticleTypeTabs>

const Template: ComponentStory<typeof ArticleTypeTabs> = (args) => <ArticleTypeTabs {...args} />

export const Normal = Template.bind({})
Normal.args = {}
