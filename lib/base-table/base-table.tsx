import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { Ref } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

// import useClientRect from "@/hooks/useClientReact.tsx";

export interface BaseTableProps extends TableProps {
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
    height,

    columns = [],
    dataSource = [],

    selectable = false,
    onSelectRow,

    ...resetProps
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const selectedRowKeysRef = useRef<any>(null);
  const tableWrapDomRef = useRef<any>(null);

  // Customize instance values exposed to parent components
  useImperativeHandle(ref, () => ({
    getSelectedRowKeys: () => selectedRowKeysRef.current,
    resetTableStatus,
  }));

  useEffect(() => {
    const baseTableDom = document.querySelector('.antd-base-table');
    if (baseTableDom && baseTableDom instanceof Element) {
      tableWrapDomRef.current = baseTableDom.parentNode;
    }
  }, []);

  useEffect(() => {
    selectedRowKeysRef.current = selectedRowKeys;
  }, [selectedRowKeys]);

  // const { height: parentNodeHeight } = useClientRect({ domRef: tableWrapDomRef });

  const parentNodeHeight = '';

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
    const defaultHeight = 400;
    const tableHeaderHeight = 60;
    return () => {
      if (height) {
        return height;
      } else if (selectedRowKeysRef.current instanceof Element && parentNodeHeight) {
        return parentNodeHeight - tableHeaderHeight;
      } else {
        return defaultHeight;
      }
    };
  }, [parentNodeHeight, height]);

  const resetTableStatus = () => {
    setSelectedRowKeys([]);
    onSelectRow && onSelectRow([]);
  };

  return (
    <Table
      rowKey={(record: any) => record.id || record.key}
      dataSource={dataSource}
      columns={columns}
      rowSelection={selectable ? tableRowSelection : false}
      pagination={false}
      scroll={{
        y: tableContentHeight(),
        x: 'max-content',
      }}
      {...resetProps}
    />
  );
};

export default React.forwardRef(BaseTable);
