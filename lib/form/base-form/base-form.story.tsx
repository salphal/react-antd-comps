import React from 'react';
import BaseForm, { type BaseFormProps } from './base-form.tsx';

export const BaseFormStory = React.forwardRef<any, BaseFormProps>(({ ...rest }, ref) => {
  const props = { ...rest };
  return (
    <BaseForm
      ref={ref}
      {...props}
    />
  );
});

BaseFormStory.displayName = 'BaseFormStory';

export default React.memo(BaseFormStory);
