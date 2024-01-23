import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NotificationButton } from './NotificationButton'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'features/NotificationButton',
  component: NotificationButton,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof NotificationButton>

const Template: ComponentStory<typeof NotificationButton> = (args) => <NotificationButton {...args} />

export const Normal = Template.bind({})
Normal.args = {}
