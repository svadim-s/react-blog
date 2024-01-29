import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Tabs } from './Tabs'
import { action } from '@storybook/addon-actions'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'shared/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />

export const Normal = Template.bind({})
Normal.args = {
  tabs: [
    {
      value: 'tab 1',
      content: 'tab 1'
    },
    {
      value: 'tab 2',
      content: 'tab 2'
    },
    {
      value: 'tab 3',
      content: 'tab 3'
    }
  ],
  value: 'tab 2',
  onTabClick: action('onTabClick')
}
