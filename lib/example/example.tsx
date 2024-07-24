import React, {
  useEffect,
  useImperativeHandle,
  type ForwardRefRenderFunction,
  type Ref,
} from 'react';
import classNames from 'classnames';

/**
 * 不可以设置 [key: string]: any; 否则无法自动解析
 * 不可以设置 [key: string]: any; 否则无法自动解析
 * 不可以设置 [key: string]: any; 否则无法自动解析
 */
export interface ExampleProps {
  /** 文本字符串 */
  string?: string;
  /** 数字 */
  number?: number;
  /** 布尔值 */
  boolean?: boolean;
  /** 对象 */
  object?: object;
  /** 下拉单选 */
  select?: any;
  /** 下拉多选 */
  multiSelect?: any;
  /** 单选 */
  radio?: any;
  /** 单行单选 */
  inlineRadio?: any;
  /** 多选 */
  check?: any;
  /** 单行多选 */
  inlineCheck?: any;
  /** 范围选择滑块 */
  range?: any;
  /** 文件选择 */
  file?: any;
  /** 颜色选择 */
  color?: any;
  /** 日期选择 */
  date?: any;
  /** 点击事件 */
  onClick?: (e: Event) => void;
}

interface ExampleRef {
  [key: string]: any;
}

const Example: ForwardRefRenderFunction<ExampleRef, ExampleProps> = (
  props: ExampleProps,
  ref: Ref<ExampleRef | HTMLDivElement>,
) => {
  // Customize instance values exposed to parent components
  useImperativeHandle(ref, () => ({}));

  return (
    <React.Fragment>
      <div className={classNames(['h-100'])}>
        <h2>Example</h2>
        <div>
          <div>string: {String(props.string)}</div>
          <div>number: {String(props.number)}</div>
          <div>boolean: {String(props.boolean)}</div>
          <div>object: {String(JSON.stringify(props.object))}</div>
          <div>select: {String(props.select)}</div>
          <div>multi-select: {String(JSON.stringify(props.multiSelect))}</div>
          <div>radio: {String(props.radio)}</div>
          <div>inline-radio: {String(props.inlineRadio)}</div>
          <div>check: {String(JSON.stringify(props.check))}</div>
          <div>inlineCheck: {String(JSON.stringify(props.inlineCheck))}</div>
          <div>range: {String(props.range)}</div>
          <div>file: {String(JSON.stringify(props.file))}</div>
          <div>color: {String(props.color)}</div>
          <div>date: {String(props.date)}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.forwardRef(Example);
