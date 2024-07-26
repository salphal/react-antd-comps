import React from 'react';
import JsonEditor, { type IJsonEditorContent, type JsonEditorProps } from './json-editor.tsx';

export const JsonEditorStory = React.forwardRef<any, JsonEditorProps>(
  (
    {
      mode = 'text',
      content = {
        json: {},
        text: null,
      } as IJsonEditorContent,
      readOnly = false,
      mainMenuBar = true,
      navigationBar = true,
      statusBar = true,
      tabSize = 2,
      height = 200,
      ...rest
    },
    ref,
  ) => {
    const props = {
      mode,
      content,
      readOnly,
      mainMenuBar,
      navigationBar,
      statusBar,
      tabSize,
      height,
      ...rest,
    };
    return (
      <JsonEditor
        ref={ref}
        {...props}
      />
    );
  },
);

JsonEditorStory.displayName = 'JsonEditorStory';

export default React.memo(JsonEditorStory);
