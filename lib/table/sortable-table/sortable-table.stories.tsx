import type { Meta, StoryObj } from '@storybook/react';
import SortAbleTable, { type SortAbleTableProps } from './sortable-table';
import { SortAbleTableStory } from './sortable-table.story';
import { sortAbleTableColumns, sortAbleTableDataSource } from './sortable-table.mock';

const meta = {
  title: 'Components/Table/SortAbleTable',
  component: SortAbleTableStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
  args: {},
  argTypes: {},
} satisfies Meta<typeof SortAbleTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: SortAbleTableProps = {
  columns: sortAbleTableColumns,
  dataSource: sortAbleTableDataSource,
  setDataSource: () => {},
};

export const DefaultSortAbleTable: Story = {
  args: {
    ...defaultProps,
  },
};
