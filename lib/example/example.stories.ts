import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Example, { ExampleProps } from './example';

const meta = {
  title: 'Components/Example',
  component: Example,
  /** https://storybook.js.org/docs/writing-docs/autodocs */
  tags: ['autodocs'],
  /** https://storybook.js.org/docs/configure/story-layout */
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    /** https://storybook.js.org/docs/essentials/actions#action-args */
    onClick: fn(),
  },
  /** https://storybook.js.org/docs/api/argtypes */
  argTypes: {
    input: {
      type: 'string',
      control: {
        type: 'text',
      },
    },
    select: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['option1', 'option2', 'option3'],
    },
    switch: {
      type: 'boolean',
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof Example>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: ExampleProps = {
  input: 'defaultValue',
  select: 'option2',
  switch: false,
};

export const DefaultExample: Story = {
  /** https://storybook.js.org/docs/writing-stories/args */
  args: {
    ...defaultProps,
  },
};

export const AnotherExample: Story = {
  args: {
    ...defaultProps,
  },
};
