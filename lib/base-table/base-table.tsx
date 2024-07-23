import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { Ref } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import classNames from 'classnames';
// import useClientRect from "@/hooks/useClientReact.tsx";

export interface BaseTableProps extends TableProps {
  [key: string]: any;

  /** 表格ID */
  id?: string;
  /** 表格类名 */
  clazzNames?: string;
  /** 表格样式 */
  styles?: any;

  /** 父级ID 用于设置自适应高度 */
  wrapperId?: string;
  /** 自定义表格高度 */
  height?: number | string;

  /** 开启选择列 */
  selectable?: boolean;
  /** 选中行时的事件 */
  onSelectRow?: (newSelectedRow: any) => void;
}

interface BaseTableRef {
  [key: string]: any;
}

const BaseTable: React.ForwardRefRenderFunction<BaseTableRef, BaseTableProps> = (
  props: BaseTableProps,
  ref: Ref<BaseTableRef | HTMLDivElement>,
) => {
  const {
    wrapperId = '',

    dataSource = [],
    columns = [],

    id = '',
    clazzNames = [],
    styles = {},
    height,

    selectable = false,
    onSelectRow,

    ...resetProps
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const selectedRowKeysRef = useRef<any>(null);

  // Customize instance values exposed to parent components
  useImperativeHandle(ref, () => ({
    getSelectedRowKeys: () => selectedRowKeysRef.current,
    resetTableStatus,
  }));

  useEffect(() => {
    selectedRowKeysRef.current = selectedRowKeys;
  }, [selectedRowKeys]);

  // const { height: contentHeight } = useClientRect({ id: wrapperId });

  const contentHeight = '';

  const rowSelectionOnChange = (selectedRowKeys: React.Key[]) => {
    onSelectRow && onSelectRow(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const tableRowSelection: any = {
    selectedRowKeys,
    onChange: rowSelectionOnChange,
    fixed: 'left',
  };

  const tableContentHeight = useMemo(() => {
    const defaultContentHeight = 400;
    const tableHeadHeight = 60;
    return () => {
      if (height) {
        return height;
      } else if (!!wrapperId && contentHeight) {
        return contentHeight - tableHeadHeight;
      } else {
        return defaultContentHeight;
      }
    };
  }, [wrapperId, contentHeight, height]);

  const resetTableStatus = () => {
    setSelectedRowKeys([]);
    onSelectRow && onSelectRow([]);
  };

  return (
    <Table
      id={id}
      className={classNames([...clazzNames])}
      rowKey={(record: any) => record.key || record.id}
      dataSource={dataSource}
      columns={columns}
      rowSelection={selectable ? tableRowSelection : false}
      pagination={false}
      scroll={{
        y: tableContentHeight(),
        x: 'max-content',
      }}
      style={{ ...styles }}
      {...resetProps}
    />
  );
};

export default React.forwardRef(BaseTable);
