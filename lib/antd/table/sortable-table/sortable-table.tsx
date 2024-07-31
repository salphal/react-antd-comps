import React, {
  type ForwardRefRenderFunction,
  type Ref,
  useEffect,
  useImperativeHandle,
} from 'react';
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table, type TableProps } from 'antd';
import BaseTable from '@lib/antd/table/base-table';
import { HolderOutlined } from '@ant-design/icons';

const draggableColumn = {
  key: 'draggable-column',
  dataIndex: 'draggable-column',
  title: '',
  width: 50,
  render: () => <HolderOutlined />,
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = (props: RowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 999 } : {}),
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};

type SetDataSource = (prev: any[]) => any[];

export interface SortAbleTableProps extends TableProps {
  /** 列表配置 */
  columns: Array<any>;
  /** 列表数据 */
  dataSource: Array<any>;
  /** 设置列表数据的方法 */
  setDataSource: any;
}

interface SortableTableRef {
  [key: string]: any;
}

/**
 * https://ant-design.antgroup.com/components/table-cn#components-table-demo-drag-sorting
 *
 * 注意: id 必须唯一
 * 注意: id 必须唯一
 * 注意: id 必须唯一
 */
const SortableTable: ForwardRefRenderFunction<SortableTableRef, SortAbleTableProps> = (
  props: SortAbleTableProps,
  ref: Ref<SortableTableRef | HTMLDivElement>,
) => {
  const { columns = [], dataSource = [], setDataSource, ...restProps } = props;

  // Customize instance values exposed to parent components
  useImperativeHandle(ref, () => ({}));

  useEffect(() => {}, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id && typeof setDataSource === 'function') {
      setDataSource((prev: any[]): any[] => {
        const activeIndex = prev.findIndex((v: any) => v.id === active.id);
        const overIndex = prev.findIndex((v: any) => v.id === over?.id);
        return arrayMove<any>(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <React.Fragment>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={dataSource.map((v: any) => v.id)}
          strategy={verticalListSortingStrategy}
        >
          <BaseTable
            components={{
              body: {
                row: Row,
              },
            }}
            columns={[draggableColumn, ...columns]}
            dataSource={dataSource}
            {...restProps}
          />
        </SortableContext>
      </DndContext>
    </React.Fragment>
  );
};

export default React.forwardRef(SortableTable);
