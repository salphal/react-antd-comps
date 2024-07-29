import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import BaseForm, { type BaseFormProps } from './base-form';
import { BaseFormStory } from './base-form.story';

const meta = {
  title: 'Components/Form/BaseForm',
  component: BaseFormStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
  args: {
    onClick: fn(),
  },
  argTypes: {},
} satisfies Meta<typeof BaseForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: BaseFormProps = {};

export const DefaultBaseForm: Story = {
  args: {
    ...defaultProps,
  },
};

export const AnotherBaseForm: Story = {
  args: {
    ...defaultProps,
  },
};
