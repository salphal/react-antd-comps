import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import BaseTable, { BaseTableProps } from './base-table';
import { baseTableColumns, baseTableDataSource } from './base-table.mock';
import { BaseTableStory } from './base-table.story';

const meta = {
  title: 'Components/BaseTable',
  component: BaseTableStory,
  /** https://storybook.js.org/docs/writing-docs/autodocs */
  tags: ['autodocs'],
  /** https://storybook.js.org/docs/configure/story-layout */
  parameters: {},
  args: {
    /** https://storybook.js.org/docs/essentials/actions#action-args */
    onSelectRow: fn(),
  },
  /** https://storybook.js.org/docs/api/argtypes */
  argTypes: {},
} satisfies Meta<typeof BaseTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: BaseTableProps = {
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
