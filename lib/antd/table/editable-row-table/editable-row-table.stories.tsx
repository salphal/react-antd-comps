import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import EditableRowTable, { type EditableRowTableProps } from './editable-row-table';
import { EditableRowTableStory } from './editable-row-table.story';
import { editableRowTableColumns, editableRowTableDataSource } from './editable-row-table.mock';

const meta = {
  title: 'Antd/Table/EditableRowTable',
  component: EditableRowTableStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
  args: {},
  argTypes: {},
} satisfies Meta<typeof EditableRowTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: EditableRowTableProps = {
  columns: editableRowTableColumns,
  dataSource: [],
  loading: false,
  deleteAble: true,
};

export const DefaultEditableRowTable: Story = {
  args: {
    ...defaultProps,
  },
};

export const AnotherEditableRowTable: Story = {
  args: {
    ...defaultProps,
  },
};
