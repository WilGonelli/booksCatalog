import React from "react";
import styles from "./modal.module.css";
import { MyButtom } from "../buttom/DefaultButtom";
import Link from "next/link";

const ModalConfirm = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.containerModal}>
      <div className={styles.containerConfirmModal}>
        <p className={styles.confirmTitle}>Tem certeza?</p>
        <p className={styles.confirmInfo}>
          Ao excluir este livro não será possível recuperá-lo. Realmente deseja
          excluí-lo?
        </p>
        <div className={styles.containerBtnConfirm}>
          <MyButtom
            textButtom={"Cancelar"}
            handleClick={onClose}
            textColor={"#202020"}
            backgroundColor={"#D5D5D5"}
          />
          <Link href={"/"} style={{ all: "unset", cursor: "pointer" }}>
            <MyButtom
              textButtom={"Excluir"}
              handleClick={onSave}
              textColor={"#FFFFFF"}
              backgroundColor={"#A70000"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
