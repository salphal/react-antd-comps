import React from 'react';
import BaseTable, { type BaseTableProps } from './base-table.tsx';

export const BaseTableStory = React.forwardRef<any, BaseTableProps>(
  (
    {
      columns = [],
      dataSource = [],
      id = '',
      clazzNames = '',
      styles = {},
      wrapperId = 'base-table-wrap',
      selectable = false,
      ...rest
    },
    ref,
  ) => {
    const props = { columns, dataSource, id, ...rest };
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
