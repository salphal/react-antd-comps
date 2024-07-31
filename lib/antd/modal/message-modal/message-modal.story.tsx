import React, { useRef } from 'react';
import MessageModal, { type MessageModalProps } from './message-modal.tsx';
import { Button } from 'antd';

export const MessageModalStory = React.forwardRef<any, MessageModalProps>(
  ({ message, ...rest }, ref) => {
    const infoModalRef = useRef<any>(null);
    const successModalRef = useRef<any>(null);
    const dangerModalRef = useRef<any>(null);

    const props = { ...rest };
    return (
      <div className="story-wrap">
        <div className={'flex flex-col justify-start items-start'}>
          <Button
            className={'mb-3 w-64'}
            onClick={() => infoModalRef.current.showModal()}
          >
            show info message modal
          </Button>
          <Button
            className={'mb-3 w-64'}
            onClick={() => successModalRef.current.showModal()}
          >
            show success message modal
          </Button>
          <Button
            className={'mb-3 w-64'}
            onClick={() => dangerModalRef.current.showModal()}
          >
            show danger message modal
          </Button>
        </div>

        <MessageModal.Info
          ref={infoModalRef}
          message={'Info message modal'}
          {...props}
        />
        <MessageModal.Success
          ref={successModalRef}
          message={'Success message modal'}
          {...props}
        />
        <MessageModal.Danger
          ref={dangerModalRef}
          message={'Danger message modal'}
          {...props}
        />
      </div>
    );
  },
);

MessageModalStory.displayName = 'MessageModalStory';

export default React.memo(MessageModalStory);
