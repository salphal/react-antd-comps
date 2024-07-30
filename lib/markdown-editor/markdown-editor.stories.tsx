import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import MarkdownEditor, { type MarkdownEditorProps } from './markdown-editor';
import { MarkdownEditorStory } from './markdown-editor.story';

const meta = {
  title: 'Components/MarkdownEditor',
  component: MarkdownEditorStory,
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
} satisfies Meta<typeof MarkdownEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: MarkdownEditorProps = {};

export const DefaultMarkdownEditor: Story = {
  args: {
    ...defaultProps,
  },
};

export const AnotherMarkdownEditor: Story = {
  args: {
    ...defaultProps,
  },
};
