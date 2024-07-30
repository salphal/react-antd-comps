import React from 'react';
import BaseForm, { type BaseFormProps } from './base-form.tsx';

export const BaseFormStory = React.forwardRef<any, BaseFormProps>(({ ...rest }, ref) => {
  const props = { ...rest };
  return (
    <div className="story-wrap h-500">
      <BaseForm
        ref={ref}
        {...props}
      />
    </div>
  );
});

BaseFormStory.displayName = 'BaseFormStory';

export default React.memo(BaseFormStory);
