import React, { useState } from 'react';
import DraggableList, { type DraggableListProps } from './draggable-list.tsx';
import { type IDraggableItem } from '@lib/draggable-list/draggable-item.tsx';
import { mockDraggableListDataSource } from '@lib/draggable-list/daggable-list.mock.tsx';
import classNames from 'classnames';

export const DraggableListStory = React.forwardRef<any, DraggableListProps>(
  ({ dataSource = [], setDataSource = [], ...rest }, ref) => {
    const [data, setData] = useState<Array<IDraggableItem>>([...mockDraggableListDataSource]);
    const props: DraggableListProps = { dataSource: data, setDataSource: setData, ...rest };
    return (
      <div className={classNames(['p-3'])}>
        <DraggableList
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

DraggableListStory.displayName = 'DraggableList';

export default React.memo(DraggableListStory);
