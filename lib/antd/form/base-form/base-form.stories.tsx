import type { Meta, StoryObj } from '@storybook/react';
import BaseForm, { type BaseFormProps } from './base-form';
import { BaseFormStory } from './base-form.story';

/**
 * 主要用于控制表单的布局
 */

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
  labelAlign: 'left',
};

export const DefaultBaseForm: Story = {
  args: {
    vertical: true,
    horizontal: false,
    singleLine: false,
    mockDataLength: 10,
    ...defaultProps,
  },
};

export const HorizontalBaseForm: Story = {
  args: {
    vertical: false,
    horizontal: true,
    singleLine: false,
    mockDataLength: 9,
    ...defaultProps,
  },
};

export const HorizontalSingleLineBaseForm: Story = {
  args: {
    vertical: false,
    horizontal: true,
    singleLine: true,
    mockDataLength: 3,
    ...defaultProps,
  },
};
