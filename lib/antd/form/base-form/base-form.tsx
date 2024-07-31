import React, {
  type ForwardRefRenderFunction,
  type Ref,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { Form, type FormProps } from 'antd';
import type { FormInstance } from '@ant-design/pro-components';
import classNames from 'classnames';
import './index.scss';
import './reset.scss';
import type { FormLabelAlign } from 'antd/lib/form/interface';

export type ColSpanType = number | string;

export interface BaseFormProps extends FormProps {
  /** form 实例 */
  form: FormInstance;

  /** label 所占的比例( 总比例 24 ) */
  labelSpan: ColSpanType;
  /** Form.Item 所占的比例( 总比例 24 ) */
  itemSpan: ColSpanType;
  /** label 文字对齐方式 */
  labelAlign?: 'left' | 'right';

  /** 基于 flex 设置 FormItem 的布局的样式 */
  layoutStyles?: CSSProperties;
  /** 是否使用 flex-row 布局 */
  horizontal?: boolean;
  /** 是否单行横向排列 */
  singleLine?: boolean;
  /** 是否使用 flex-col 布局 */
  vertical?: boolean;

  /** 自定义类名 */
  clazzName?: string;
  /** 子元素 */
  children?: ReactNode;
}

export interface BaseFormRef {}

const BaseForm: ForwardRefRenderFunction<BaseFormRef, BaseFormProps> = (
  props: BaseFormProps,
  ref: Ref<BaseFormRef | HTMLDivElement>,
) => {
  const {
    clazzName = 'antd-base-form',
    form,
    labelSpan = 4,
    itemSpan = 20,
    layoutStyles = {},
    horizontal = false,
    singleLine = false,
    vertical = false,
    ...restProps
  } = props;

  useImperativeHandle(ref, () => ({}));

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Form
        className={classNames({
          'form-item-no-margin': true, // 默认清除所有原生 margin
          'ant-base-form': true,
          [clazzName]: true, // 自定义类名
          'base-form-item-single-line': singleLine, // 是否单行, 并且不能换行
          'base-form-item-flex-row': horizontal, // 横向排列
          'base-form-item-flex-col': vertical, // 纵向排列
        })}
        form={form}
        labelCol={{ span: labelSpan }}
        wrapperCol={{ span: itemSpan }}
        {...restProps}
      >
        <section
          className={'ant-form-layout'}
          style={{ ...layoutStyles }}
        >
          {props.children}
        </section>
      </Form>
    </React.Fragment>
  );
};

export default React.forwardRef(BaseForm);
