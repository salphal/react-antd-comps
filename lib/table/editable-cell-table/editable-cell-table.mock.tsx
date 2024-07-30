import Mock from 'mockjs';
import { Form, Input, Radio } from 'antd';

export const editAbleTableFormData = Mock.mock({
  id: '@guid()',
  name: '@cname()',
  age: '@integer(10, 100)',
  gender: "@pick(['male','female'])",
});

export const editAbleTableColumns = [
  {
    key: 'input',
    dataIndex: 'input',
    title: 'Input',
  },
  {
    key: 'select',
    dataIndex: 'select',
    title: 'Select',
    valueType: 'select',
    valueEnum: {
      option1: {
        text: 'Option1',
        status: 'option1',
      },
      option2: {
        text: 'Option2',
        status: 'option2',
      },
      option3: {
        text: 'Option3',
        status: 'option3',
      },
    },
  },
  {
    key: 'radio',
    dataIndex: 'radio',
    title: 'renderFormItem > Radio',
    renderFormItem() {
      return (
        <Radio.Group>
          <Radio value={'radio1'}>Radio1</Radio>
          <Radio value={'radio2'}>Radio2</Radio>
        </Radio.Group>
      );
    },
  },
];

export const editAbleTableDataSource = Mock.mock(() => {
  return Mock.mock({
    'dataSource|5-10': [
      {
        [`key|+1`]: 0,
        id: '@guid()',
        input: '@name()',
        select: '@pick(["option1","option2","option3"])',
        radio: '@pick(["radio1","radio2"])',
      },
    ],
  }).dataSource;
});
