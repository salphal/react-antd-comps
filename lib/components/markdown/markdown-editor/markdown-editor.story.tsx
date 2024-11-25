import React from 'react';
import MarkdownEditor, { type MarkdownEditorProps } from './markdown-editor.tsx';

export const MarkdownEditorStory = React.forwardRef<any, MarkdownEditorProps>(
  ({ ...rest }, ref) => {
    const props = { ...rest };
    return (
      <div className="story-wrap h-500">
        <MarkdownEditor
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

MarkdownEditorStory.displayName = 'MarkdownEditor';

export default React.memo(MarkdownEditorStory);
