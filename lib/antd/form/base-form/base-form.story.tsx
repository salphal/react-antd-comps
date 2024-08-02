import React from 'react';
import BaseForm, { type BaseFormProps } from './base-form.tsx';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { Input, InputNumber, Select } from 'antd';

export const BaseFormStory = React.forwardRef<any, BaseFormProps>(
  ({ form, horizontal, singleLine, vertical = false, ...rest }, ref) => {
    const [formInstance] = useForm();
    const props = { form: formInstance, vertical, horizontal, singleLine, ...rest };

    let mockDataLength = 5;

    if (vertical) {
      mockDataLength = 5;
    } else if (horizontal && !singleLine) {
      mockDataLength = 9;
    } else if (horizontal && singleLine) {
      mockDataLength = 3;
    }

    return (
      <div className="story-wrap h-500 bg-gray-100">
        <BaseForm
          clazzName={'base-form-story bg-white'}
          ref={ref}
          {...props}
        >
          {Array(mockDataLength)
            .fill(null)
            .map((v: any, i: number) => (
              <FormItem
                key={Date.now() + i}
                name={`Label_${i}`}
                label={`Label_${i}`}
                style={{
                  width: '33.33%',
                }}
              >
                <Input />
              </FormItem>
            ))}
        </BaseForm>
      </div>
    );
  },
);

BaseFormStory.displayName = 'BaseFormStory';

export default React.memo(BaseFormStory);
