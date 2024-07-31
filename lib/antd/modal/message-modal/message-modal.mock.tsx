import Mock from 'mockjs';

export const messageModalFormData = Mock.mock({
  id: '@guid()',
  name: '@cname()',
  age: '@integer(10, 100)',
  gender: "@pick(['male','female'])",
});

export const messageModalColumns = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Name',
  },
  {
    key: 'age',
    dataIndex: 'age',
    title: 'Age',
  },
  {
    key: 'gender',
    dataIndex: 'gender',
    title: 'Gender',
  },
];

export const messageModalDataSource = Mock.mock(() => {
  return Mock.mock({
    'dataSource|5-10': [
      {
        [`key|+1`]: 0,
        id: '@guid()',
        name: '@cname()',
        age: '@integer(10, 100)',
        gender: "@pick(['male','female'])",
      },
    ],
  }).dataSource;
});
