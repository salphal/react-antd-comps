import type { Meta, StoryObj } from '@storybook/react';
import MessageModal, { type MessageModalProps } from './message-modal';
import { MessageModalStory } from './message-modal.story';

const meta = {
  title: 'Antd/Modal/MessageModal',
  component: MessageModalStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
  args: {},
  argTypes: {},
} satisfies Meta<typeof MessageModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: MessageModalProps = {
  message: '',
};

export const DefaultMessageModal: Story = {
  args: {
    ...defaultProps,
  },
};
