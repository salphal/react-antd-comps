import React, {
  type ForwardRefRenderFunction,
  type Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

export interface MarkdownEditorProps {
  /**  */
  value: string;
  /**  */
  onChange?: (value: any) => void;
  /** 编辑器高度( 默认: 100% ) */
  height?: number;
  /** 皮肤样式 */
  theme?: 'light' | 'dark';
  /** 站位提示信息 */
  placeholder?: string;
  /** 编辑最大行数 */
  maxLength?: number;
  /** 是否可以编辑*/
  editable?: boolean;
}

interface MarkdownEditorRef {
  [key: string]: any;
}

/**
 * https://github.com/uiwjs/react-md-editor?tab=readme-ov-file
 */
const MarkdownEditor: ForwardRefRenderFunction<MarkdownEditorRef, MarkdownEditorProps> = (
  props: MarkdownEditorProps,
  ref: Ref<MarkdownEditorRef | HTMLDivElement>,
) => {
  const {
    height = 200,
    theme = 'light',
    placeholder = 'Please enter Markdown text',
    maxLength = 10000,
    editable = true,
    value,
    onChange,
  } = props;

  const [loading, setLoading] = useState<any>(false);
  const [content, setContent] = useState('');

  // Customize instance values exposed to parent components
  useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    value && setContent(value);
  }, [value]);

  useEffect(() => {
    setLoading(false);
    document.documentElement.setAttribute('data-color-mode', theme);
    setLoading(true);
  }, [theme]);

  const MDEditorOnChange = (value: any) => {
    setContent(value);
    typeof onChange === 'function' && onChange(value);
  };

  return (
    <React.Fragment>
      <div style={{ height: '100%' }}>
        {editable && loading ? (
          <MDEditor
            value={content}
            onChange={MDEditorOnChange}
            // height={height}
            minHeight={height}
            textareaProps={{
              placeholder,
              maxLength,
            }}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        ) : (
          <MDEditor.Markdown
            source={content}
            style={{ whiteSpace: 'pre-wrap' }}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default React.forwardRef(MarkdownEditor);
