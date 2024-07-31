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

export type ColSpanType = number | string;

export interface BaseFormProps extends FormProps {
  /** form 实例 */
  form: FormInstance;

  /** label 所占的比例( 总比例 24 ) */
  labelSpan: ColSpanType;
  /** Form.Item 所占的比例( 总比例 24 ) */
  itemSpan: ColSpanType;

  /** 基于 flex 设置 FormItem 的布局的样式 */
  layoutStyles?: CSSProperties;
  // /** */
  // horizontal?: boolean;
  /** 是否使用 flex-col 布局 */
  vertical?: boolean;

  /** 自定义类名集合 */
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
    clazzName,
    form,
    labelSpan = 4,
    itemSpan = 20,
    layoutStyles = {},
    vertical = false,
    // horizontal = false,
    ...restProps
  } = props;

  useImperativeHandle(ref, () => ({}));

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Form
        className={classNames({
          'ant-base-form': true,
          clazzName: true,
          'form-item-no-margin': true,
          // 'flex-row': horizontal,
          'flex-col': vertical,
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
