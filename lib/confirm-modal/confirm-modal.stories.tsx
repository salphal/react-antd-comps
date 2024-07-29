import type { Meta, StoryObj } from '@storybook/react';
import ConfirmModal, { type ConfirmModalProps } from './confirm-modal';
import { ConfirmModalStory } from './confirm-modal.story';

const meta = {
  title: 'Components/ConfirmModal',
  component: ConfirmModalStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
  args: {},
  argTypes: {},
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: ConfirmModalProps = {};

export const DefaultConfirmModal: Story = {
  args: {
    ...defaultProps,
  },
};

export const AnotherConfirmModal: Story = {
  args: {
    ...defaultProps,
  },
};
