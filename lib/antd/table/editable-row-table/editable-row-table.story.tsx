import React, { useState } from 'react';
import EditableRowTable, { type EditableRowTableProps } from './editable-row-table.tsx';
import { editableRowTableDataSource } from '@lib/antd/table/editable-row-table/editable-row-table.mock.tsx';

export const EditableRowTableStory = React.forwardRef<any, EditableRowTableProps>(
  ({ dataSource, setDataSource, ...rest }, ref) => {
    const [data, setData] = useState([...editableRowTableDataSource]);
    const props = { dataSource: data, setDataSource: setData, ...rest };
    return (
      <div className="story-wrap">
        <EditableRowTable
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

EditableRowTableStory.displayName = 'EditableRowTableStory';

export default React.memo(EditableRowTableStory);
