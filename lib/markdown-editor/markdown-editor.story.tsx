import React from 'react';
import MarkdownEditor, { type MarkdownEditorProps } from './markdown-editor';

export const MarkdownEditorStory = React.forwardRef<any, MarkdownEditorProps>(
  ({ ...rest }, ref) => {
    const props = { ...rest };
    return (
      <div className="story-wrap">
        <MarkdownEditor
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

MarkdownEditorStory.displayName = 'MarkdownEditorStory';

export default React.memo(MarkdownEditorStory);
