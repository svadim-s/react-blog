import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CommentList } from './CommentList'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof CommentList>

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />

export const Normal = Template.bind({})
Normal.args = {
  comments: [
    {
      id: '1',
      text: 'hello',
      user: {
        id: '1',
        username: 'Toodie'
      }
    },
    {
      id: '2',
      text: 'Comment 2',
      user: {
        id: '2',
        username: 'Ulbi'
      }
    }
  ]
}

export const Loading = Template.bind({})
Loading.args = {
  comments: [],
  isLoading: true
}
