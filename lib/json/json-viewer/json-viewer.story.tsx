import React from 'react';
import JsonViewer, { type JsonViewerProps } from './json-viewer.tsx';

export const JsonViewerStory = React.forwardRef<any, JsonViewerProps>(({ ...rest }, ref) => {
  const props = { ...rest };
  return (
    <div className="story-wrap h-500">
      <JsonViewer
        ref={ref}
        {...props}
      />
    </div>
  );
});

JsonViewerStory.displayName = 'JsonViewerStory';

export default React.memo(JsonViewerStory);
