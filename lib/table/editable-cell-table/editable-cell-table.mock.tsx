import Mock from 'mockjs';
import { Form, Input, Radio, Checkbox, Select, Switch } from 'antd';
import type { ITableCell } from '@lib/table/editable-cell-table/editable-cell-table.tsx';

export const editAbleTableFormData = Mock.mock({
  text: '@name()',
  input: '@name()',
  select: '@pick(["option1","option2","option3"])',
  radio: '@pick(["radio1","radio2"])',
  checkbox: ['@pick(["checkbox1","checkbox2"])', '@pick(["checkbox1","checkbox2",""])'],
  switch: '@pick([true,false])',
});

export const editAbleTableColumns: Array<ITableCell> = [
  {
    key: 'text',
    dataIndex: 'text',
    title: 'text',
    width: 200,
    editable: false,
  },
  {
    key: 'input',
    dataIndex: 'input',
    title: 'Input',
    width: 200,
    renderFormItem(schema, config, form, action) {
      return <Input />;
    },
  },
  {
    key: 'select',
    dataIndex: 'select',
    title: 'Select',
    width: 200,
    renderFormItem(schema, config, form, action) {
      return (
        <Select
          options={[
            {
              label: 'Option1',
              value: 'option1',
            },
            {
              label: 'Option2',
              value: 'option2',
            },
            {
              label: 'Option3',
              value: 'option3',
            },
          ]}
        />
      );
    },
  },
  {
    key: 'radio',
    dataIndex: 'radio',
    title: 'Radio',
    width: 260,
    renderFormItem: ({ key }, { record }, form) => {
      return (
        <Radio.Group>
          <Radio value={'radio1'}>Radio1</Radio>
          <Radio value={'radio2'}>Radio2</Radio>
        </Radio.Group>
      );
    },
  },
  {
    key: 'checkbox',
    dataIndex: 'checkbox',
    title: 'Checkbox',
    width: 260,
    renderFormItem(schema, config, form, action) {
      return (
        <Checkbox.Group>
          <Checkbox value={'checkbox1'}>Checkbox1</Checkbox>
          <Checkbox value={'checkbox2'}>Checkbox2</Checkbox>
        </Checkbox.Group>
      );
    },
  },
  {
    key: 'switch',
    dataIndex: 'switch',
    title: 'Switch',
    width: 100,
    renderFormItem(schema, config, form, action) {
      return <Switch />;
    },
  },
];

export const editAbleTableDataSource = Mock.mock(() => {
  return Mock.mock({
    'dataSource|5-10': [
      {
        [`key|+1`]: 0,
        id: '@guid()',
        text: '@name()',
        input: '@name()',
        select: '@pick(["option1","option2","option3"])',
        radio: '@pick(["radio1","radio2"])',
        checkbox: ['@pick(["checkbox1","checkbox2"])', '@pick(["checkbox1","checkbox2",""])'],
        switch: '@pick([true,false])',
      },
    ],
  }).dataSource;
});
