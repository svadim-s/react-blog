import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import AdminPanelPage from './AdminPanelPage'
import { StoreDecorator } from 'shared/config/storybook/StoreDecoraator/StoreDecorator'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'pages/AdminPanelPage',
  component: AdminPanelPage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof AdminPanelPage>

const Template: ComponentStory<typeof AdminPanelPage> = (args) => <AdminPanelPage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]
