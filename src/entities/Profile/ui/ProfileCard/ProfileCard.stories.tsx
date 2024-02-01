import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ProfileCard } from './ProfileCard'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />

const primaryArgs = {
  data: {
    username: 'admin',
    age: 22,
    country: Country.Russia,
    lastname: 'Sergeev',
    first: 'Vadim',
    city: 'Moscow',
    currency: Currency.RUB,
    avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg'
  }
}

export const Primary = Template.bind({})
Primary.args = primaryArgs

export const PrimaryRedesigned = Template.bind({})
PrimaryRedesigned.args = primaryArgs
PrimaryRedesigned.decorators = [NewDesignDecorator]

export const WithError = Template.bind({})
WithError.args = {
  error: 'true'
}

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true
}
