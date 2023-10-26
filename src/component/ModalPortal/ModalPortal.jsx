import { useContext } from "react";
import { createPortal } from "react-dom";

import './ModalPortal.css';
import context from "../../context";

export const ModalPortal = () => {
  const { modalElement } = useContext(context);

  if (modalElement === null) return null;

  return (
    <>
      {createPortal(
        <div className='modalWindow'>
          {modalElement}
        </div>,
        document.body
      )}
    </>
  );
};
