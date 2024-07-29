import React, {type ForwardRefRenderFunction, type Ref, useState, useEffect, useRef, useImperativeHandle} from "react";

export interface BaseFormProps {
}

export interface BaseFormRef {
}

const BaseForm: ForwardRefRenderFunction<BaseFormRef, BaseFormProps> = (
  props: BaseFormProps,
  ref: Ref<BaseFormRef | HTMLDivElement>,
) => {

  const {} = props;

  useImperativeHandle(ref, () => ({}));

  useEffect(() => {}, []);

  return (
    <React.Fragment>

      <div className={""}>
        hello world
      </div>

    </React.Fragment>
  );
};

export default React.forwardRef(BaseForm);
