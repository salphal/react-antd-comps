import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import JsonViewer, { type JsonViewerProps } from './json-viewer';
import { JsonViewerStory } from './json-viewer.story';
import { jsonViewerFormData } from './json-viewer.mock';

const meta = {
  title: 'Components/Json/JsonViewer',
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
  argTypes: {},
} satisfies Meta<typeof JsonViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: JsonViewerProps = {
  src: jsonViewerFormData,
};

export const DefaultJsonViewer: Story = {
  args: {
    ...defaultProps,
  },
};

export const AnotherJsonViewer: Story = {
  args: {
    ...defaultProps,
  },
};
