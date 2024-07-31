import Mock from 'mockjs';
import React from 'react';

export const draggableListFormData = Mock.mock({
  id: '@guid()',
  name: '@cname()',
  age: '@integer(10, 100)',
  gender: "@pick(['male','female'])",
});

export const draggableListColumns = [
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

export const draggableListDataSource = Mock.mock(() => {
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

export const mockDraggableListDataSource = draggableListDataSource.map((v: any) => {
  const { id, ...rest } = v;
  return {
    ...v,
    render: () => <div className={'m-2'}>{JSON.stringify(rest)}</div>,
  };
});
