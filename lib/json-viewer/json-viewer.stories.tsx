import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import JsonViewer, { type JsonViewerProps } from "./json-viewer";
import { JsonViewerStory } from './json-viewer.story';


const meta = {
  title: 'Components/JsonViewer',
  component: JsonViewerStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
  args: {
    onClick: fn(),
  },
  argTypes: {
  },
} satisfies Meta<typeof JsonViewer>;


export default meta;
type Story = StoryObj<typeof meta>;


const defaultProps: JsonViewerProps = {
};

export const DefaultJsonViewer: Story = {
  args: {
    ...defaultProps
  }
};

export const AnotherJsonViewer: Story = {
  args: {
    ...defaultProps
  }
};
