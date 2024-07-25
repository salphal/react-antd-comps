import React, { useState } from 'react';
import DraggableList, { type DraggableListProps } from './draggable-list.tsx';
import { type IDraggableItem } from '@lib/draggable-list/draggable-item.tsx';
import { draggableListDataSource } from '@lib/draggable-list/daggable-list.mock.tsx';

export const DraggableListStory = React.forwardRef<any, DraggableListProps>(
  ({ dataSource = [], setDataSource = [], ...rest }, ref) => {
    const mockData = draggableListDataSource.map((v: any) => {
      const { id, ...rest } = v;
      return {
        ...v,
        render: () => <div className={'m-2'}>{JSON.stringify(rest)}</div>,
      };
    });
    const [data, setData] = useState<Array<IDraggableItem>>([...mockData]);
    const props: DraggableListProps = { dataSource: data, setDataSource: setData, ...rest };
    return (
      <DraggableList
        ref={ref}
        {...props}
      />
    );
  },
);

DraggableListStory.displayName = 'DraggableListStory';

export default React.memo(DraggableListStory);
