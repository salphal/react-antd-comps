import React, { type ReactNode } from 'react';
import ConfirmModal from '@lib/antd/modal/confirm-modal/confirm-modal.tsx';

export interface MessageModalProps {
  title?: ReactNode;
  message: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  ref?: any;
}

export const MessageModal = {
  Info: React.forwardRef(function MessageModal(props: MessageModalProps, ref) {
    return (
      <ConfirmModal
        ref={ref}
        msgIconType={'info'}
        {...props}
      />
    );
  }),
  Success: React.forwardRef(function MessageModal(props: MessageModalProps, ref) {
    return (
      <ConfirmModal
        ref={ref}
        msgIconType={'success'}
        {...props}
      />
    );
  }),
  Danger: React.forwardRef(function MessageModal(props: MessageModalProps, ref) {
    return (
      <ConfirmModal
        ref={ref}
        msgIconType={'danger'}
        {...props}
      />
    );
  }),
};

export default MessageModal;
