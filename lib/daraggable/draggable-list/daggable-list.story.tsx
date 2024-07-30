import React, { useState } from 'react';
import DraggableList, { type DraggableListProps } from './draggable-list.tsx';
import { type IDraggableItem } from '@lib/daraggable/draggable-list/draggable-item.tsx';
import { mockDraggableListDataSource } from '@lib/daraggable/draggable-list/daggable-list.mock.tsx';

export const DraggableListStory = React.forwardRef<any, DraggableListProps>(
  ({ dataSource = [], setDataSource = [], ...rest }, ref) => {
    const [data, setData] = useState<Array<IDraggableItem>>([...mockDraggableListDataSource]);
    const props: DraggableListProps = { dataSource: data, setDataSource: setData, ...rest };
    return (
      <div className="story-wrap h-500">
        <DraggableList
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

DraggableListStory.displayName = 'DraggableListStory';

export default React.memo(DraggableListStory);
