import type { Meta, StoryObj } from '@storybook/react';
import BaseForm, { type BaseFormProps } from './base-form';
import { BaseFormStory } from './base-form.story';

const meta = {
  title: 'Antd/Form/BaseForm',
  component: BaseFormStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
  args: {},
  argTypes: {},
} satisfies Meta<typeof BaseForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: BaseFormProps = {
  form: null,
  labelSpan: 6,
  itemSpan: 18,
  vertical: true,
  labelAlign: 'left',
};

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
