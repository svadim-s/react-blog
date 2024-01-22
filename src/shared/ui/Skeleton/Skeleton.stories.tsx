import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Skeleton } from './Skeleton'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'shared/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />

export const Primary = Template.bind({})
Primary.args = {
  width: '100%',
  height: 200
}

export const Circle = Template.bind({})
Circle.args = {
  border: '50%',
  width: 100,
  height: 100
}

export const NormalDark = Template.bind({})
NormalDark.args = {
  width: '100%',
  height: 200
}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

export const CircleDark = Template.bind({})
CircleDark.args = {
  border: '50%',
  width: 100,
  height: 100
}
CircleDark.decorators = [ThemeDecorator(Theme.DARK)]
