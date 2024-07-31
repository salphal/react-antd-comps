import React, { useState } from 'react';
import EditAbleTable, { type EditAbleCellProTableProps } from './editable-cell-pro-table.tsx';
import { editAbleProTableDataSource } from '@lib/antd/table/editable-cell-table/editable-cell-pro-table.mock.tsx';

export const EditAbleTableStory = React.forwardRef<any, EditAbleCellProTableProps>(
  (
    {
      columns,
      dataSource,
      setDataSource,
      addable = false,
      rowKey = 'id',
      defaultRowData = {},
      optionColumnRender = (row, config, defaultDoms) => {
        return [defaultDoms.delete];
      },
      ...rest
    },
    ref,
  ) => {
    const [data, setData] = useState<any[]>([...editAbleProTableDataSource]);
    console.log('=>(editable-cell-pro-table.story.tsx:22) data', data);
    const optionsColumn = {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      render: () => {
        return null;
      },
    };
    const props = {
      columns: [...columns, optionsColumn],
      dataSource: data,
      setDataSource: setData,
      addable,
      rowKey,
      defaultRowData,
      ...rest,
    };

    return (
      <div className="story-wrap h-500">
        <EditAbleTable
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

EditAbleTableStory.displayName = 'EditAbleTableStory';

export default React.memo(EditAbleTableStory);
