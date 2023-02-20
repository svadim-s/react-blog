import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Modal } from './Modal'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const Primary = Template.bind({})
Primary.args = {
  isOpen: true,
  children: 'qwertyuiosjadnsdsakldsadsakldsadsad,sadsadhsads dsad ksaljdasjldksajldsaljkd'
}

export const Dark = Template.bind({})
Dark.args = {
  isOpen: true,
  children: 'qwertyuiosjadnsdsakldsadsakldsadsad,sadsadhsads dsad ksaljdasjldksajldsaljkd'
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
