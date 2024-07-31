import React from 'react';
import BaseForm, { type BaseFormProps } from './base-form.tsx';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { Input, InputNumber, Select } from 'antd';

export const BaseFormStory = React.forwardRef<any, BaseFormProps>(
  ({ form, horizontal = false, vertical = false, ...rest }, ref) => {
    const [formInstance] = useForm();
    const props = { form: formInstance, horizontal, vertical, ...rest };

    const formItemStyles = {
      // width: '33%',
    };
    return (
      <div className="story-wrap h-500">
        <BaseForm
          ref={ref}
          {...props}
        >
          <FormItem
            label={'姓名'}
            style={formItemStyles}
          >
            <Input />
          </FormItem>
          <FormItem
            label={'年龄'}
            style={formItemStyles}
          >
            <InputNumber />
          </FormItem>
          <FormItem
            label={'职业'}
            style={formItemStyles}
          >
            <Select
              options={Array(3)
                .fill(null)
                .map((v: any, i: number) => ({ label: `Option${i}`, value: `option${i}` }))}
            />
          </FormItem>
        </BaseForm>
      </div>
    );
  },
);

BaseFormStory.displayName = 'BaseFormStory';

export default React.memo(BaseFormStory);
