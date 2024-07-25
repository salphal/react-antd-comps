import React, {
  type ForwardRefRenderFunction,
  type Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DraggableItem, { type IDraggableItem } from './draggable-item.tsx';

const draggableListStyle = {
  display: 'flex',
  overflow: 'hidden auto',
  padding: '20px 20px 0 0',
  flexFlow: 'column nowrap',
  height: '100%',
  width: '100%',
};

/**
 * "react-dnd": "^16.0.1",
 * "react-dnd-html5-backend": "^16.0.1",
 * https://github.com/AdolescentJou/react-dnd-demo
 */
export interface DraggableListProps {
  /** 列表数据 */
  dataSource: Array<IDraggableItem>;
  /** 设置列表数据的方法 */
  setDataSource: (dataList: Array<IDraggableItem>) => void;
}

interface DraggableListRef {
  [key: string]: any;
}

const DraggableList: ForwardRefRenderFunction<DraggableListRef, DraggableListProps> = (
  props: DraggableListProps,
  ref: Ref<DraggableListRef | HTMLDivElement>,
) => {
  const { dataSource, setDataSource } = props;

  // Customize instance values exposed to parent components
  useImperativeHandle(ref, () => ({}));

  useEffect(() => {}, []);

  const draggableItemOnSwapPlaces = (dragIndex: number, hoverIndex: number) => {
    const min = 0;
    const max = dataSource.length - 1;
    if (dragIndex < min || dragIndex > max || hoverIndex < min || hoverIndex > max) return;
    const data = dataSource.slice();
    const temp = data[dragIndex];
    if (!data[hoverIndex] || !temp) return;
    // 交换位置
    data[dragIndex] = data[hoverIndex];
    data[hoverIndex] = temp;
    // 更新数据
    setDataSource(data);
  };

  const draggableList = useMemo(
    () => () => {
      if (!Array.isArray(dataSource) || !dataSource.length) {
        return [];
      }
      return dataSource.map((v: IDraggableItem, i: number) => (
        <DraggableItem
          id={v.id || i}
          key={`draggable-item-${v.id}`}
          index={i}
          onSwapPlaces={draggableItemOnSwapPlaces}
          {...v}
        />
      ));
    },
    [dataSource],
  );

  return (
    <React.Fragment>
      <DndProvider backend={HTML5Backend}>
        <div
          id={'draggable-list'}
          style={draggableListStyle}
        >
          {draggableList()}
        </div>
      </DndProvider>
    </React.Fragment>
  );
};

export default React.forwardRef(DraggableList);
