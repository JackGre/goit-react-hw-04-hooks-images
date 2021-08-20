import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";


const modalRoot = document.querySelector("#modal-root");

export default function Modal({ showModal, children }) {
  
  const onUnmout = useRef(null);
  useEffect(() =>  {
    window.addEventListener("keydown", onUnmout.current);
  })

  useEffect(() => {
    window.removeEventListener("keydown", onUnmout.current);
  })

  onUnmout.current = (e) => {
    if (e.code === "Escape") {
      showModal();
    }
  };

  const closeModalbyClick = (e) => {
    if (e.currentTarget === e.target) {
      showModal();
    }
  };

 

    return createPortal(
      <div className={styles.backdrop} onClick={closeModalbyClick}>
        <button
          type="button"
          onClick={() => showModal()}
          className={styles.button}
        >
          
        </button>
        <div className={styles.modal}>{children}</div>
      </div>,
      modalRoot
    );
}
