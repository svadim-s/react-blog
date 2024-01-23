import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Page } from './Page'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'widget/Page',
  component: Page,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Page>

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]
