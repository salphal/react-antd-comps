import Mock from 'mockjs';
import { Form, Input, Radio, Checkbox, Select, Switch } from 'antd';
import type { ITableCell } from '@lib/antd/table/editable-cell-table/editable-cell-pro-table.tsx';

export const editAbleProTableFormData = Mock.mock({
  text: '@name()',
  input: '@name()',
  select: '@pick(["option1","option2","option3"])',
  radio: '@pick(["radio1","radio2"])',
  checkbox: ['@pick(["checkbox1","checkbox2"])', '@pick(["checkbox1","checkbox2",""])'],
  switch: '@pick([true,false])',
});

export const editAbleProTableColumns: Array<ITableCell> = [
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
          options={Array(3)
            .fill(null)
            .map((v: any, i: number) => ({ label: `Option${i}`, value: `option${i}` }))}
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
          {Array(2)
            .fill(null)
            .map((v: any, i: number) => (
              <Radio
                key={Date.now + `radio${i}`}
                value={`radio${i}`}
              >{`Radio${i}`}</Radio>
            ))}
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
          {Array(2)
            .fill(null)
            .map((v: any, i: number) => (
              <Checkbox
                key={Date.now + `checkbox${i}`}
                value={`checkbox${i}`}
              >{`Checkbox${i}`}</Checkbox>
            ))}
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

export const editAbleProTableDataSource = Mock.mock(() => {
  return Mock.mock({
    'dataSource|5-10': [
      {
        [`key|+1`]: 0,
        id: '@guid()',
        text: '@name()',
        input: '@name()',
        select: '@pick(["option0","option1","option2"])',
        radio: '@pick(["radio1","radio2"])',
        checkbox: ['@pick(["checkbox0","checkbox1"])', '@pick(["checkbox0","checkbox1",""])'],
        switch: '@pick([true,false])',
      },
    ],
  }).dataSource;
});
