import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import BaseTable, { BaseTableProps } from './base-table';
import { baseTableColumns, baseTableDataSource } from './base-table.mock';
import { BaseTableStory } from './base-table.story';

const meta = {
  title: 'Components/BaseTable',
  component: BaseTableStory,
  tags: ['autodocs'],
  parameters: {},
  args: {
    onSelectRow: fn(),
  },
  argTypes: {
    height: {
      type: 'number',
      control: {
        type: 'number',
      },
    },
  },
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
