import React from 'react';
import JsonViewer, { type JsonViewerProps } from './json-viewer';

export const JsonViewerStory = React.forwardRef<any, JsonViewerProps>(({ ...rest }, ref) => {
  const props = { ...rest };
  return (
    <JsonViewer
      ref={ref}
      {...props}
    />
  );
});

JsonViewerStory.displayName = 'JsonViewerStory';

export default React.memo(JsonViewerStory);
