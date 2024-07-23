import React, { useState, useEffect, useRef } from 'react';
import type { ButtonProps } from '@lib/Button';

export interface ExampleProps {
  [key: string]: any;

  input?: string;
  size?: string;
}

export const Example = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color = 'primary', size = 'medium', ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
      />
    );
  },
);

Example.displayName = 'Example';

export default React.memo(Example);
