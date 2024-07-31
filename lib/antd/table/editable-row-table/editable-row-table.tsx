import React, {
  type ReactNode,
  type Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Button, Form, Popconfirm, type TableProps } from 'antd';
import BaseTable from '../base-table';
import EditableCell from './editable-row-cell.tsx';
import './index.scss';
import classNames from 'classnames';
import {
  deleteTableItemOnDelete,
  editTableItemOnCancel,
  editTableItemOnEdit,
  updateEditTableItemByKey,
} from './utils.ts';

export interface EditableRowCell {
  key: string;
  dataIndex: string;
  title: string;
  width?: number;
  editable?: boolean;
  renderFormItem?: (record: any) => ReactNode;
}

export interface EditableRowTableProps extends TableProps {
  /** 表格配置 */
  columns: Array<EditableRowCell>;
  /** 数据源 */
  dataSource: Array<any>;
  /** 设置数据的方法 */
  setDataSource?: (cb: (prev: any[]) => any[]) => void;
  /** 操作列 */
  renderOptionColumn?: (value: any, record: any) => ReactNode;

  /** 是否有删除按钮 */
  deleteAble?: boolean;
  /** 是否加载中状态 */
  loading?: boolean;

  /** 自定义类名 */
  clazzName?: string;
  /** 自定义样式 */
  style?: any;

  /** 确认事件 */
  onConfirm?: (
    record: any,
    handler: (key: string, record: any, prevRecord: any) => Array<any>,
  ) => void;
  /** 取消事件*/
  onCancel?: (record: any, handler: (record: any, prevRecord: any) => Array<any>) => void;
  /** 编辑事件 */
  onEdit?: (record: any, handler: (record: any, prevRecord: any) => Array<any>) => void;
  /** 删除事件 */
  onDelete?: (
    record: any,
    handler: (key: string, record: any, prevRecord: any) => Array<any>,
  ) => void;
}

interface EditableRowTableRef {
  [key: string]: any;
}

const EditableRowTable: React.ForwardRefRenderFunction<
  EditableRowTableRef,
  EditableRowTableProps
> = (props: EditableRowTableProps, ref: Ref<EditableRowTableRef | HTMLDivElement>) => {
  const {
    dataSource = [],
    columns = [],
    setDataSource,
    renderOptionColumn = null,

    deleteAble = false,
    loading = false,

    clazzName = '',
    style = {},

    onEdit,
    onConfirm,
    onCancel,
    onDelete,
    ...restProps
  } = props;

  const [form] = Form.useForm();

  const baseTableRef = useRef<any>(null);

  // Customize instance values exposed to parent components
  useImperativeHandle(ref, () => ({
    validateFields: form.validateFields,
    ...baseTableRef.current,
  }));

  useEffect(() => {
    const [editRow] = dataSource.filter((v) => v.isEditing);
    if (editRow) form.setFieldsValue(editRow);
  }, [dataSource]);

  const tableOperationColumn = {
    key: 'tableOperation',
    dataIndex: 'tableOperation',
    title: '操作',
    fixed: 'right',
    width: 200,
    render: (value: any, record: any) => {
      return record.isEditing ? (
        <span>
          <Button
            onClick={() => handleEditTableEventManager('confirm', record)}
            style={{ marginRight: 8 }}
            type={'primary'}
            loading={loading}
          >
            确认
          </Button>
          <Popconfirm
            title="是否放弃更改?"
            onConfirm={() => handleEditTableEventManager('cancel', record)}
          >
            <Button disabled={loading}>取消</Button>
          </Popconfirm>
        </span>
      ) : (
        <>
          <Button
            disabled={record.isChecked}
            style={{ marginRight: 8 }}
            onClick={() => handleEditTableEventManager('edit', record)}
          >
            编辑
          </Button>
          {deleteAble ? (
            <Popconfirm
              title="是否要删除此项?"
              onConfirm={() => handleEditTableEventManager('delete', record)}
              okText={'确认'}
              cancelText={'取消'}
            >
              <Button
                disabled={record.isEditing || record.isChecked}
                danger
              >
                删除
              </Button>
            </Popconfirm>
          ) : null}
          {renderOptionColumn && renderOptionColumn(value, record)}
        </>
      );
    },
  };

  const tableColumns: () => Array<any> = useMemo(
    () => () => {
      if (!Array.isArray(columns) || !columns.length) return [];
      return [...columns, tableOperationColumn].map((col: any) =>
        col.editable
          ? {
              ...col,
              onCell: (record: any) => ({
                loading,
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: record.isEditing,
                renderFormItem: col.renderFormItem,
              }),
            }
          : col,
      );
    },
    [columns, loading],
  );

  const handleEditTableEventManager = (type: string, kwargs: object = {}, ...args: any[]) => {
    const handles: any = {
      confirm: handleEditTableOnConfirm,
      cancel: handleEditTableOnCancel,
      edit: handleEditTableOnEdit,
      delete: handleEditTableOnDelete,
    };
    args = Object.keys(kwargs).length ? [kwargs, ...args] : args;
    handles[type] && handles?.[type](...args);
  };

  const handleEditTableOnConfirm = async (record: any) => {
    if (!form) return;
    const newData = await form.validateFields();
    const isDiff = diffRowRecord(newData, record);
    const newRecord = { ...record, ...newData, isDiff };
    if (typeof onConfirm === 'function') {
      onConfirm(newRecord, updateEditTableItemByKey);
      return;
    } else if (typeof setDataSource === 'function') {
      setDataSource((prev: any[]) => updateEditTableItemByKey(record.id, newRecord, prev));
    }
  };

  const handleEditTableOnEdit = (record: any) => {
    if (typeof onEdit === 'function') {
      onEdit(record, editTableItemOnEdit);
      return;
    } else if (typeof setDataSource === 'function') {
      setDataSource((prev: any[]) => {
        return editTableItemOnEdit(record.id, prev);
      });
    }
  };

  const handleEditTableOnCancel = (record: any) => {
    if (typeof onCancel === 'function') {
      onCancel(record, editTableItemOnCancel);
      return;
    } else if (typeof setDataSource === 'function') {
      setDataSource((prev: any[]) => editTableItemOnCancel(record.id, prev));
    }
  };

  const handleEditTableOnDelete = (record: any) => {
    if (typeof onDelete === 'function') {
      onDelete(record, deleteTableItemOnDelete);
      return;
    } else if (typeof setDataSource === 'function') {
      setDataSource((prev: any[]) => deleteTableItemOnDelete(record.id, prev));
    }
  };

  const diffRowRecord = (newData: any[], oldData: any[]) => {
    if (
      Object.prototype.toString.call(newData) !== '[object Object]' ||
      !Object.keys(newData).length ||
      Object.prototype.toString.call(oldData) !== '[object Object]' ||
      !Object.keys(oldData).length
    )
      return true;
    return !Object.keys(newData).every((k: any) => newData[k] === oldData[k]);
  };

  return (
    <div
      className={classNames([clazzName])}
      style={{
        ...style,
      }}
    >
      <Form
        form={form}
        component={false}
      >
        <BaseTable
          ref={baseTableRef}
          className={classNames(['ant-editable-table', clazzName])}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={dataSource}
          columns={tableColumns()}
          rowClassName="ant-editable-table-row"
          pagination={false}
          {...restProps}
        />
      </Form>
    </div>
  );
};

export default React.forwardRef(EditableRowTable);
