import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Text, TextTheme } from './Text'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Primary = Template.bind({})
Primary.args = {
  title: 'Title',
  text: 'Description'
}

export const Error = Template.bind({})
Error.args = {
  title: 'Title',
  text: 'Description',
  theme: TextTheme.ERROR
}

export const OnlyTitle = Template.bind({})
OnlyTitle.args = {
  title: 'Title'
}

export const OnlyText = Template.bind({})
OnlyText.args = {
  text: 'Description'
}

export const PrimaryDark = Template.bind({})
PrimaryDark.args = {
  title: 'Title',
  text: 'Description'
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTitleDark = Template.bind({})
OnlyTitleDark.args = {
  title: 'Title'
}
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTextDark = Template.bind({})
OnlyTextDark.args = {
  text: 'Description'
}
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]
