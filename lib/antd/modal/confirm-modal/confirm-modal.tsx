import React, {
  type ForwardRefRenderFunction,
  type ReactNode,
  type Ref,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { CheckCircleFilled, CloseOutlined, InfoCircleFilled } from '@ant-design/icons';
import { Button, Modal, Spin } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars-2';
import './index.scss';

export type MsgIconTypes = 'info' | 'success' | 'danger';

const modalIconList: any = {
  info: <InfoCircleFilled style={{ color: '#0166FF' }} />,
  success: <CheckCircleFilled style={{ color: '#138d49' }} />,
  danger: <InfoCircleFilled style={{ color: '#f31c1c' }} />,
};

/**
 * 弹窗加载显示
 */
const ModalLoading = (props: any) => {
  const { loading = false } = props;
  return (
    loading && (
      <Spin
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
        }}
      />
    )
  );
};

/**
 * 弹窗遮罩层
 */
const ModalMask = (props: any) => {
  const { isShow = false, onClick = () => {} } = props;
  return (
    isShow && (
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          zIndex: 999,
          cursor: 'not-allowed',
        }}
        onClick={onClick}
      />
    )
  );
};

interface MessageModalProps {
  title?: ReactNode;
  message?: ReactNode;
  msgIconType?: MsgIconTypes;
}

/**
 * 消息弹窗
 */
const MessageModal = (props: MessageModalProps) => {
  const { title, message, msgIconType, ...restProps } = props;
  let icon: any = null;

  if (typeof msgIconType === 'string' && Object.keys(modalIconList).includes(msgIconType)) {
    icon = modalIconList[msgIconType];
  }
  return (
    <div
      style={{
        padding: '24px 18px',
        textAlign: 'left',
        fontSize: '18px',
      }}
    >
      {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
      <span>{message}</span>
    </div>
  );
};

interface IModalFooterProps {
  loading?: boolean;
  confirmBtnText?: string;
  cancelBtnText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * 默认弹窗底部控制按钮
 */
const ModalFooter = (props: IModalFooterProps) => {
  const { loading, confirmBtnText, cancelBtnText, onConfirm, onCancel } = props;
  return (
    <div className="confirm-modal-footer right">
      <Button
        type="primary"
        onClick={onConfirm}
        loading={loading}
      >
        {confirmBtnText}
      </Button>
      <Button
        onClick={onCancel}
        disabled={loading}
      >
        {cancelBtnText}
      </Button>
    </div>
  );
};

export interface ModalStyle {
  /** 弹窗距离顶部的距离*/
  top?: string;
  /** 弹窗宽度 */
  width?: string | number;
  /** 弹窗高度 */
  height?: string | number;

  header?: any;
  body?: any;
  footer?: any;
  mask?: any;
  content?: any;
}

export interface ConfirmModalProps {
  /** 是否在加载状态 */
  open?: boolean;

  /** 弹窗标题 */
  title?: ReactNode;
  /** 自定义底部控制按钮 */
  footer?: ReactNode | null;

  /** 是否在加载状态 */
  loading?: boolean;
  /** 是否禁用状态 */
  disabled?: boolean;

  /** 是否自动关闭 */
  closedAble?: boolean;
  /** 内容区域是否根据 style.body.height 高度滚动 */
  scrollAble?: boolean;

  /** 弹窗消息内容 */
  message?: ReactNode;
  /** 弹窗消息icon类型 */
  msgIconType?: MsgIconTypes;

  /** 自定义样式对象 */
  style?: ModalStyle;

  /** 确认按钮文字 */
  confirmBtnText?: string;
  /** 取消按钮文字 */
  cancelBtnText?: string;

  /** 确认按钮事件 */
  onConfirm?: () => void;
  /** 取消按钮事件 */
  onCancel?: () => void;
  /** 弹窗关闭事件 */
  onClose?: () => void;
  /** 遮罩层点击事件 */
  maskOnClick?: () => void;

  /** 子元素 */
  children?: any;
}

interface ConfirmModalRef {
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
  showModal?: () => void;
  hideModal?: () => void;
}

const ConfirmModal: ForwardRefRenderFunction<ConfirmModalRef, ConfirmModalProps> = (
  props: ConfirmModalProps,
  ref: Ref<ConfirmModalRef | HTMLDivElement>,
) => {
  const {
    open,

    title = '标题',
    footer,

    loading = false,
    disabled = false,

    closedAble = true,
    scrollAble = false,

    message = '',
    msgIconType,

    style: { top = '20%', width = 400, ...restStyles } = {
      top: '20%',
      width: 400,
      body: {
        height: 'auto',
      },
    },

    confirmBtnText = '确认',
    cancelBtnText = '取消',

    onConfirm,
    onCancel,
    onClose,
    maskOnClick,

    children = (
      <>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </>
    ),

    ...restProps
  } = props;

  const [show, setShow] = useState(false);

  const modalStyles = {
    header: {},
    body: {
      height: 'auto',
      padding: '12px 24px',
    },
    mask: {},
    footer: {},
    content: {},
    ...props.style,
  };

  const bodyHeight = useMemo(
    () => () => {
      if (
        'body' in modalStyles &&
        typeof modalStyles.body === 'object' &&
        'height' in modalStyles.body &&
        modalStyles.body.height
      )
        return modalStyles.body.height;
      return 'auto';
    },
    [props.style],
  );

  // Customize instance values exposed to parent components
  useImperativeHandle(ref, () => ({
    isOpen: show,
    setIsOpen: setShow,
    showModal: () => handleConfirmModalEventAspect('show'),
    hideModal: () => handleConfirmModalEventAspect('hide'),
  }));

  const handleConfirmModalEventAspect = (type: string, kwargs: object = {}, ...args: any[]) => {
    const handles: any = {
      confirm: handleConfirmModalOnConfirm,
      cancel: handleConfirmModalOnCancel,
      close: handleConfirmModalOnClose,

      show: handleConfirmModalOnShow,
      hide: handleConfirmModalOnHide,

      mask: handleConfirmModalMaskOnClick,
    };
    args = Object.keys(kwargs).length ? [kwargs, ...args] : args;
    handles[type] && handles?.[type](...args);
  };

  const handleConfirmModalOnConfirm = () => {
    typeof onConfirm === 'function' && onConfirm();
  };

  const handleConfirmModalOnCancel = () => {
    closedAble && setShow(false);
    typeof onCancel === 'function' && onCancel();
  };

  const handleConfirmModalOnClose = () => {
    setShow(false);
    typeof onClose === 'function' && onClose();
  };

  const handleConfirmModalMaskOnClick = () => {
    typeof maskOnClick === 'function' && maskOnClick();
  };

  const handleConfirmModalOnShow = () => {
    setShow(true);
  };

  const handleConfirmModalOnHide = () => {
    setShow(false);
  };

  const child = message ? (
    <MessageModal
      title={title}
      message={message}
      msgIconType={msgIconType}
    />
  ) : typeof children === 'function' ? (
    children(props)
  ) : (
    children
  );

  const content = (
    <>
      <ModalLoading loading={loading} />
      <ModalMask
        isShow={Boolean(loading || disabled)}
        onClick={() => handleConfirmModalEventAspect('mask')}
      />
      {child}
    </>
  );

  const modalFooter = footer ? (
    footer
  ) : (
    <ModalFooter
      loading={loading}
      confirmBtnText={confirmBtnText}
      cancelBtnText={cancelBtnText}
      onConfirm={() => handleConfirmModalEventAspect('confirm')}
      onCancel={() => handleConfirmModalEventAspect('cancel')}
    />
  );

  return (
    <React.Fragment>
      <Modal
        className="confirm-modal"
        title={title}
        open={'open' in props ? open : show}
        footer={modalFooter}
        width={width}
        style={{
          top,
          ...restStyles,
        }}
        styles={modalStyles}
        closeIcon={<CloseOutlined onClick={() => handleConfirmModalEventAspect('close')} />}
        onCancel={() => handleConfirmModalEventAspect('cancel')}
        {...restProps}
      >
        {scrollAble ? (
          <Scrollbars
            style={{ height: bodyHeight(), minHeight: 300 }}
            autoHide
          >
            {content}
          </Scrollbars>
        ) : (
          content
        )}
      </Modal>
    </React.Fragment>
  );
};

export default React.forwardRef(ConfirmModal);
