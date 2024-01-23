import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { RatingCard } from './RatingCard'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'entities/Rating/RatingCard',
  component: RatingCard,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof RatingCard>

const Template: ComponentStory<typeof RatingCard> = (args) => <RatingCard {...args} />

export const Normal = Template.bind({})
Normal.args = {}
