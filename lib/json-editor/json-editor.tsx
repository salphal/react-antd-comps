import React, {
  type ForwardRefRenderFunction,
  type Ref,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  JSONEditor,
  type Content,
  type ContentErrors,
  type JSONPatchResult,
} from 'vanilla-jsoneditor';

/**
 * "vanilla-jsoneditor": "^0.23.0"
 * https://github.com/josdejong/svelte-jsoneditor
 */

const defaultContent = {
  json: {
    key: 'value',
  },
  text: undefined,
};

export interface IJsonEditorContent {
  /** 二者传一个即可 */
  json: string; // JSON 对象
  text: string | undefined | null; // JSON 字符串
}

export type TJsonEditorOnChange = (
  content: Content,
  previousContent: Content,
  changeStatus: {
    changedContent: ContentErrors | null;
    prevContent: JSONPatchResult | null;
  },
) => void;

export interface JsonEditorProps {
  /** 操作模式 */
  mode?: 'text' | 'tree' | 'table';
  /** JSON 内容 */
  content?: IJsonEditorContent;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否显示控制条 */
  mainMenuBar?: boolean;
  /** 是否显示 导航栏 */
  navigationBar?: boolean;
  /** 是否显示 状态栏 */
  statusBar?: boolean;
  /** 代码缩进大小 */
  tabSize?: number;
  /** 编辑器高度 */
  height?: number | string;
  /** 错误回调  */
  onError?: (err: Error) => void;
  /** 值改变时的回调 */
  onChange?: TJsonEditorOnChange;
}

interface JsonEditorRef {
  [key: string]: any;
}

const JsonEditor: ForwardRefRenderFunction<JsonEditorRef, JsonEditorProps> = (
  props: JsonEditorProps,
  ref: Ref<JsonEditorRef | HTMLDivElement>,
) => {
  const { onChange, height = '100%' } = props;

  const refContainer = useRef<any>(null);
  const refEditor = useRef<any>(null);

  // Customize instance values exposed to parent components
  useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    /** create editor hook */
    console.log('create editor', refContainer.current);
    refEditor.current = new JSONEditor({
      target: refContainer.current,
      props: {},
    });
    return () => {
      /** destroy editor hook */
      if (refEditor.current) {
        console.log('destroy editor');
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (refEditor.current) {
      console.log('update props', props);
      refEditor.current.updateProps({
        content: props.content || defaultContent,
        onChange: jsonEditorOnChange,
        ...props,
      });
    }
  }, [props]);

  const jsonEditorOnChange: TJsonEditorOnChange = (
    updatedContent,
    previousContent,
    { changedContent, prevContent },
  ) => {
    typeof onChange === 'function' &&
      onChange(updatedContent, previousContent, { changedContent, prevContent });
  };

  return (
    <React.Fragment>
      <div
        className="vanilla-jsoneditor-react"
        ref={refContainer}
        style={{ height: height || '100%' }}
      />
    </React.Fragment>
  );
};

export default React.forwardRef(JsonEditor);
