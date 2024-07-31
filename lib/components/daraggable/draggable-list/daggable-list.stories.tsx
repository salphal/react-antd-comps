import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DraggableList, { type DraggableListProps } from './draggable-list';
import { DraggableListStory } from './daggable-list.story';
import { mockDraggableListDataSource } from './daggable-list.mock';

const meta = {
  title: 'Components/Draggable/DraggableList',
  component: DraggableListStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
  args: {},
  argTypes: {},
} satisfies Meta<typeof DraggableList>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: DraggableListProps = {
  dataSource: mockDraggableListDataSource,
  setDataSource: () => {},
};

export const DefaultDraggableList: Story = {
  args: {
    ...defaultProps,
  },
};
