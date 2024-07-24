import React from 'react';
import type { ExampleProps } from '@lib/example/example.tsx';
import Example from './example.tsx';

export const ExampleStory = React.forwardRef<any, ExampleProps>(
  ({ string = '', number = 0, boolean = false, object = {}, ...rest }, ref) => {
    const props = { string, number, boolean, ...rest };
    return (
      <Example
        ref={ref}
        {...props}
      />
    );
  },
);

ExampleStory.displayName = 'ExampleStory';

export default React.memo(ExampleStory);
