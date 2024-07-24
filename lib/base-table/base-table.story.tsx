import React from 'react';
import BaseTable, { type BaseTableProps } from './base-table.tsx';

export const BaseTableStory = React.forwardRef<any, BaseTableProps>(
  ({ columns = [], dataSource = [], height = 0, selectable = false, ...rest }, ref) => {
    const props = { columns, dataSource, height, selectable, ...rest };
    return (
      <BaseTable
        ref={ref}
        {...props}
      />
    );
  },
);

BaseTableStory.displayName = 'BaseTableStory';

export default React.memo(BaseTableStory);
