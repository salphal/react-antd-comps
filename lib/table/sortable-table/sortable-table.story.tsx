import React, { useState } from 'react';
import SortAbleTable, { type SortAbleTableProps } from './sortable-table.tsx';
import { sortAbleTableDataSource } from '@lib/table/sortable-table/sortable-table.mock.tsx';

export const SortAbleTableStory = React.forwardRef<any, SortAbleTableProps>(
  ({ columns = [], dataSource = [], setDataSource, ...rest }, ref) => {
    const [data, setData] = useState([...sortAbleTableDataSource]);
    const props = { dataSource: data, setDataSource: setData, columns, ...rest };
    return (
      <div className="story-wrap h-500">
        <SortAbleTable
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

SortAbleTableStory.displayName = 'SortAbleTableStory';

export default React.memo(SortAbleTableStory);
