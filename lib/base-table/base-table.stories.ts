import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import BaseTable, { BaseTableProps } from './base-table';
import { baseTableColumns, baseTableDataSource } from './base-table.mock';

const meta = {
  title: 'Components/BaseTable',
  component: BaseTable,
  /** https://storybook.js.org/docs/writing-docs/autodocs */
  tags: ['autodocs'],
  /** https://storybook.js.org/docs/configure/story-layout */
  parameters: {
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
  args: {
    // input: 'arg.input',
    // select: 'arg.select',
    // columns: [],
    // dataSource: [],
    /** https://storybook.js.org/docs/essentials/actions#action-args */
    onSelectRow: fn(),
  },
  /** https://storybook.js.org/docs/api/argtypes */
  argTypes: {
    input: {
      control: {
        type: 'text',
      },
    },
    select: {
      control: {
        type: 'select',
      },
      options: ['option1', 'option2', 'option3'],
    },
    switch: {
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof BaseTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: BaseTableProps = {
  input: 'defaultValue',
  select: 'option2',
  switch: false,
  columns: baseTableColumns,
  dataSource: baseTableDataSource,
};

export const DefaultBaseTable: Story = {
  args: {
    ...defaultProps,
  },
};

export const AnotherBaseTable: Story = {
  args: {
    ...defaultProps,
  },
};
