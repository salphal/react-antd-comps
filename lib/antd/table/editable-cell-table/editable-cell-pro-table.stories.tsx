import type { Meta, StoryObj } from '@storybook/react';
import EditableCellProTable, { type EditAbleCellProTableProps } from './editable-cell-pro-table';
import { EditAbleTableStory } from './editable-cell-pro-table.story';
import {
  editAbleProTableColumns,
  editAbleProTableDataSource,
  editAbleProTableFormData,
} from './editable-cell-pro-table.mock';

/**
 * Antd/ProTable 可自定义 tableCell 为 formItem
 */

const meta = {
  title: 'Antd/Table/EditableCellProTable',
  component: EditAbleTableStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
  args: {},
  argTypes: {},
} satisfies Meta<typeof EditableCellProTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: EditAbleCellProTableProps = {
  columns: editAbleProTableColumns,
  dataSource: editAbleProTableDataSource,
  setDataSource: () => {},
  addable: true,
  defaultRowData: {
    ...editAbleProTableFormData,
  },
};

export const DefaultEditAbleProTable: Story = {
  args: {
    ...defaultProps,
  },
};
