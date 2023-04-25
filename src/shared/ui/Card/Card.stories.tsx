import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Card } from './Card'
import { Text } from '../Text/Text'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'shared/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: <Text title={'test'} text={'text text'} />
}
