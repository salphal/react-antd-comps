import type { Meta, StoryObj } from '@storybook/react';
import JsonEditor, { JsonEditorProps } from './json-editor';
import { JsonEditorStory } from './json-editor.story';
import { jsonEditorFormData } from './json-editor.mock';

const meta = {
  title: 'Components/Json/JsonEditor',
  component: JsonEditorStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
  args: {},
  argTypes: {
    readOnly: {
      type: 'boolean',
      control: {
        type: 'boolean',
      },
    },
    mainMenuBar: {
      type: 'boolean',
      control: {
        type: 'boolean',
      },
    },
    navigationBar: {
      type: 'boolean',
      control: {
        type: 'boolean',
      },
    },
    statusBar: {
      type: 'boolean',
      control: {
        type: 'boolean',
      },
    },
    tabSize: {
      type: 'boolean',
      control: {
        type: 'boolean',
      },
    },
    height: {
      type: 'number',
      control: {
        type: 'number',
      },
    },
  },
} satisfies Meta<typeof JsonEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: JsonEditorProps = {
  mode: 'text',
  content: {
    json: jsonEditorFormData,
    text: null,
  },
  readOnly: false,
  mainMenuBar: true,
  navigationBar: true,
  statusBar: true,
  tabSize: 2,
  height: 200,
  onError: () => {},
  onChange: () => {},
};

export const DefaultJsonEditor: Story = {
  args: {
    ...defaultProps,
  },
};
