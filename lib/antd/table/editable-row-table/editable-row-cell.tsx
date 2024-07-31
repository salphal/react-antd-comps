import React, { useImperativeHandle, type Ref, type ReactNode } from 'react';

export interface EditableCellProps {
  /** 是否正在编辑中 */
  editing: boolean;
  /** 是否加载中 */
  loading: boolean;
  /** 数据索引 */
  dataIndex: string;
  /** 列标题 */
  title: ReactNode;
  /** 编辑所需的表单组件 */
  renderFormItem: (record: any) => ReactNode;
  /** 当前行的数据集合 */
  record: any;
  /** 索引 */
  index: number;
  /** 子元素 */
  children: ReactNode;
}

interface EditableCellRef {
  [key: string]: any;
}

const EditableRowCell: React.ForwardRefRenderFunction<EditableCellRef, EditableCellProps> = (
  props: EditableCellProps,
  ref: Ref<EditableCellRef | HTMLDivElement>,
) => {
  const {
    editing,
    loading,
    dataIndex,
    title,
    record,
    index,
    renderFormItem,
    children,
    ...restProps
  } = props;

  // Customize instance values exposed to parent components
  useImperativeHandle(ref, () => ({}));

  return (
    <td
      className="table-form-item"
      {...restProps}
    >
      {editing && typeof renderFormItem === 'function'
        ? renderFormItem({ ...record, disabled: loading })
        : children}
    </td>
  );
};

export default React.forwardRef(EditableRowCell);
