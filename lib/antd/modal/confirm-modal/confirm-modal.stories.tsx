import type { Meta, StoryObj } from '@storybook/react';
import ConfirmModal, { type ConfirmModalProps } from './confirm-modal';
import { ConfirmModalStory } from './confirm-modal.story';

const meta = {
  title: 'Antd/Modal/ConfirmModal',
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
    style: {
      width: 1000,
      body: {},
    },
    scrollAble: true,
  },
};

export const InfoMessageConfirmModal: Story = {
  args: {
    ...defaultProps,
    message: 'Info Message Confirm Modal',
    msgIconType: 'info',
  },
};

export const SuccessMessageConfirmModal: Story = {
  args: {
    ...defaultProps,
    message: 'Success Message Confirm Modal',
    msgIconType: 'success',
  },
};

export const DangerMessageConfirmModal: Story = {
  args: {
    ...defaultProps,
    message: 'Danger Message Confirm Modal',
    msgIconType: 'danger',
  },
};
