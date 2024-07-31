import Mock from 'mockjs';

export const baseTableFormData = Mock.mock({
  id: '@guid()',
  name: '@cname()',
  age: '@integer(10, 100)',
  gender: "@pick(['male','female'])",
});

export const baseTableColumns = [
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

export const baseTableDataSource = Mock.mock(() => {
  return Mock.mock({
    'dataSource|20': [
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
