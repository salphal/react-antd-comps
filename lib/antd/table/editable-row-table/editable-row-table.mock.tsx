import Mock from 'mockjs';
import type { EditableRowCell } from '@lib/antd/table/editable-row-table/editable-row-table.tsx';
import { Form, Input, Select } from 'antd';

export const editableRowTableFormData = Mock.mock({
  id: '@guid()',
  name: '@cname()',
  age: '@integer(10, 100)',
  gender: "@pick(['male','female'])",
});

export const editableRowTableColumns: Array<EditableRowCell> = [
  {
    key: 'text',
    dataIndex: 'text',
    title: 'Text',
  },
  {
    key: 'input',
    dataIndex: 'input',
    title: 'Input',
    editable: true,
    width: 300,
    renderFormItem: (record: any) => (
      <Form.Item name={'input'}>
        <Input disabled={record.disabled} />
      </Form.Item>
    ),
  },
  {
    key: 'select',
    dataIndex: 'select',
    title: 'Select',
    editable: true,
    width: 300,
    renderFormItem: (record: any) => (
      <Form.Item name={'select'}>
        <Select
          disabled={record.disabled}
          options={Array(3)
            .fill(null)
            .map((v: any, i: number) => ({ label: `Option${i}`, value: `option${i}` }))}
        />
      </Form.Item>
    ),
  },
];

export const editableRowTableDataSource = Mock.mock(() => {
  return Mock.mock({
    'dataSource|5-10': [
      {
        id: '@guid()',
        text: '@name()',
        input: '@name()',
        select: '@pick(["option0","option1","option2"])',
        gender: "@pick(['male','female'])",
      },
    ],
  }).dataSource;
});
