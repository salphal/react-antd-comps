import React, { useRef } from 'react';
import ConfirmModal, { type ConfirmModalProps } from './confirm-modal';
import { Button } from 'antd';

export const ConfirmModalStory = React.forwardRef<any, ConfirmModalProps>(
  (
    {
      title = '标题',
      loading = false,
      open = undefined,
      disabled = false,
      closedAble = true,
      scrollAble = false,
      confirmBtnText = '确认',
      cancelBtnText = '取消',
      footer = null,
      style = {
        top: '20%',
        width: 400,
        header: {},
        body: {
          height: 'auto',
        },
        mask: {},
        footer: {},
        content: {},
      },
      message,
      msgIconType,
      ...rest
    },
    ref,
  ) => {
    const confirmModalProps = {
      title,
      loading,
      disabled,
      closedAble,
      scrollAble,
      footer,
      style,
      message,
      msgIconType,
      ...rest,
    };

    const confirmModalRef = useRef<any>(null);

    return (
      <div className="story-wrap h-100">
        <ConfirmModal
          ref={confirmModalRef}
          {...confirmModalProps}
        >
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias autem debitis deserunt
            dolorem est facere inventore iste minus quae, quos reprehenderit saepe sit, temporibus
            vel, veritatis vero voluptates voluptatibus!
          </div>
          <div>
            A ab aliquid, consectetur doloribus in magnam natus quisquam repudiandae rerum vel.
            Accusantium aspernatur commodi corporis enim eum excepturi, harum hic laudantium
            molestias nulla omnis possimus quaerat tempore temporibus veniam!
          </div>
          <div>
            Ad deleniti dolorum magnam maxime nam nemo, numquam porro quia quibusdam quidem quod
            reiciendis suscipit totam, veritatis vitae. Architecto eos exercitationem nostrum
            pariatur quidem recusandae saepe voluptas? In, libero, neque!
          </div>
          <div>
            Ad doloribus error ipsa, iure magni praesentium quaerat recusandae similique. A aliquid
            delectus doloremque, dolores ea eaque expedita impedit itaque libero minus molestias
            odit placeat quas quia quidem voluptates voluptatibus!
          </div>
          <div>
            Ea eum libero maiores odio quae soluta voluptatem. Deserunt distinctio ducimus fuga
            nostrum unde, veniam voluptatum. Beatae exercitationem ipsa nobis placeat possimus quam
            quod reiciendis soluta sunt suscipit! Impedit, quas?
          </div>
          <div>
            Beatae distinctio impedit sint tempora totam. Accusantium animi at cupiditate deleniti
            eligendi eos error facere libero magnam nemo nesciunt nobis numquam obcaecati pariatur
            quas quos rem temporibus vel, veniam voluptatem.
          </div>
          <div>
            Autem commodi consequatur culpa distinctio, doloribus enim excepturi facere libero
            maiores nam nesciunt tempora totam, ut. Alias commodi doloremque, dolores hic, ipsa
            iusto laudantium molestias odio possimus quia recusandae reiciendis.
          </div>
          <div>
            Accusamus aliquid at est et eum fuga ipsum laboriosam magni natus, necessitatibus, non
            odio quidem quos. Earum error illum in ipsa quaerat sed? Commodi fuga molestias neque
            quibusdam recusandae ullam!
          </div>
          <div>
            Asperiores eius error fuga fugiat molestias natus odio pariatur perferendis praesentium
            quasi, quis recusandae repellat, rerum sequi sit soluta totam veritatis vitae? Alias
            cumque eum ex laborum perspiciatis quas, tempora!
          </div>
          <div>
            Alias commodi debitis dolore, dolores error exercitationem impedit minus nam neque
            nobis, possimus praesentium quam quas reprehenderit sapiente sequi similique unde ut vel
            vero? Ex iure labore molestiae obcaecati sed.
          </div>
        </ConfirmModal>
        <Button onClick={() => confirmModalRef.current.showModal()}>show confirm modal</Button>
      </div>
    );
  },
);

ConfirmModalStory.displayName = 'ConfirmModalStory';

export default React.memo(ConfirmModalStory);
