import React, {
  useEffect,
  useImperativeHandle,
  type ForwardRefRenderFunction,
  type Ref,
} from 'react';
import classNames from 'classnames';

/** 不可以设置 [key: string]: any; 否则无法自动解析 */
/** 不可以设置 [key: string]: any; 否则无法自动解析 */
/** 不可以设置 [key: string]: any; 否则无法自动解析 */
export interface ExampleProps {
  string?: string;
  number?: number;
  boolean?: boolean;
  object?: object;
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

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <div className={classNames(['h-40'])}>
        <h2>Example</h2>
        <div>string: {String(props.string)}</div>
        <div>number: {String(props.number)}</div>
        <div>boolean: {String(props.boolean)}</div>
        <div>object: {String(JSON.stringify(props.object))}</div>
      </div>
    </React.Fragment>
  );
};

export default React.forwardRef(Example);
