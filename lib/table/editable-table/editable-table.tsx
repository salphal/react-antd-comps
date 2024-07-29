import React, {
  type ForwardRefRenderFunction,
  type Ref,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { EditableProTable } from '@ant-design/pro-components';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

export interface IColumnItem {
  title: string;
  dataIndex: string;
  width: string | number;
  valueType?: 'text' | 'input' | 'select' | 'option';
  formItemProps: {
    [key: string]: any;
    rules: Array<any>;
  };
  valueEnum: {
    [key: string]: {
      text: string;
      status: any;
    };
  };

  [key: string]: any;
}

export interface EditAbleTableProps {
  /** 列表配置 */
  columns: Array<any>;
  /** 列表数据 */
  dataSource: Array<any>;
  /** 设置列表数据的方法 */
  setDataSource: (value: any) => void;
  /** 行数据唯一标识 */
  rowKey?: string;
  /** 列表标题 */
  headerTitle?: string;
  /** 顶部工具行渲染函数 */
  toolBarRender?: () => Array<any>;
  /** 操作列渲染函数 */
  optionColumnRender?: (row: any, config: any, defaultDoms: any) => Array<any>;
  /** 是否显示添加 */
  addable?: boolean;
  /** 单行默认数据 */
  defaultRowData?: any;
  /** 列表滚动设置 */
  scroll?: { x?: number; y?: number };
  /** 列表高度 */
  height?: number;
}

interface EditableTableRef {
  [key: string]: any;
}

/**
 * https://procomponents.ant.design/components/editable-table#%E5%AE%9E%E6%97%B6%E4%BF%9D%E5%AD%98%E7%9A%84%E7%BC%96%E8%BE%91%E8%A1%A8%E6%A0%BC
 *
 * "antd": "^5.15.3"
 *
 * 必须保证数据有唯一 id
 * 必须保证数据有唯一 id
 * 必须保证数据有唯一 id
 */
const EditableTable: ForwardRefRenderFunction<EditableTableRef, EditAbleTableProps> = (
  props: EditAbleTableProps,
  ref: Ref<EditableTableRef | HTMLDivElement>,
) => {
  const {
    rowKey = 'id',

    columns = [],
    dataSource = [],
    setDataSource,

    toolBarRender,
    optionColumnRender,

    headerTitle = '',
    addable = false,
    scroll,
    defaultRowData = {},

    height = 300,
    ...restProps
  } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    dataSource.map((item: any) => item.id),
  );

  const getOriginalValueDataIndex = (columns: Array<any>, dataSource: Array<any>) => {
    const columnDataMap: any = {};
    const allColumnDataIndex = columns.map((v) => v.dataIndex);

    allColumnDataIndex.forEach((k) => {
      columnDataMap[k] = [];
    });

    dataSource.forEach((v) => {
      allColumnDataIndex.forEach((k) => {
        const value = v[k] || null;
        columnDataMap[k].push(value);
      });
    });

    return allColumnDataIndex.filter((k) =>
      columnDataMap[k].some((v: any) => typeof v !== 'object'),
    );
  };

  const editableColumns = useMemo(
    () => () => {
      if (
        !Array.isArray(columns) ||
        !columns.length ||
        !Array.isArray(dataSource) ||
        !dataSource.length
      )
        return [];
      const originalValueDataIndex = getOriginalValueDataIndex(columns, dataSource);
      return columns.filter((v) => [...originalValueDataIndex, 'option'].includes(v.dataIndex));
    },
    [columns, dataSource],
  );

  // Customize instance values exposed to parent components
  useImperativeHandle(ref, () => ({}));

  return (
    <React.Fragment>
      <EditableProTable<any>
        className={classNames([])}
        headerTitle={headerTitle}
        columns={editableColumns()}
        rowKey={rowKey}
        // scroll={scroll ? scroll : { x: 'max-content', y: height }}
        value={dataSource}
        onChange={(value: any) => {
          setDataSource(value);
        }}
        recordCreatorProps={
          addable
            ? {
                newRecordType: 'dataSource',
                position: 'bottom',
                record: () => {
                  return {
                    id: uuidv4(),
                    ...defaultRowData,
                  };
                },
              }
            : false
        }
        toolBarRender={() => {
          return typeof toolBarRender === 'function' ? toolBarRender() : [];
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return typeof optionColumnRender === 'function'
              ? optionColumnRender(row, config, defaultDoms)
              : [
                  defaultDoms.delete,
                  // defaultDoms.save,
                  // defaultDoms.cancel
                ];
          },
          onValuesChange: (record: any, recordList: any[]) => {
            console.log('=>(editable-table.tsx:185) recordList', recordList);
            typeof setDataSource === 'function' && setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
        {...restProps}
      />
    </React.Fragment>
  );
};

export default React.forwardRef(EditableTable);
