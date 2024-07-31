import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import BaseTable, { BaseTableProps } from './base-table';
import { baseTableColumns, baseTableDataSource } from './base-table.mock';
import { BaseTableStory } from './base-table.story';

/**
 * Antd/Table 自动处理 Table 的高度( 始终等于父容器的高度 )
 */
const meta = {
  title: 'Antd/Table/BaseTable',
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
