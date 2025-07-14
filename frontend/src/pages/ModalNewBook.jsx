import React from "react";
import styles from "./home.module.css";
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { CiImageOn } from "react-icons/ci";
import { MyButtom } from "@/components/buttom/DefaultButtom";

const Modal = ({
  isOpen,
  onClose,
  textModalTitle,
  title,
  setTitle,
  autor,
  setAutor,
  description,
  setDescription,
  publishDate,
  setPublishDate,
  setImage,
  imagePreview,
  setImagePreview,
  onSave,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.containerModal}>
      <div className={styles.containerFormsNewBook}>
        <h1 className={styles.titleNewBook}>{textModalTitle} </h1>
        <div className={styles.containerFormInfoArea}>
          <div className={styles.formTitleArea}>
            <input
              type="text"
              className={styles.inputNewBook}
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className={styles.inputNewBook}
              placeholder="Autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
            <DatePicker
              selected={publishDate}
              onChange={(date) => setPublishDate(date)}
              placeholderText="Data de publicação"
              dateFormat="dd/MM/yyyy"
              locale={ptBR}
              className={styles.inputNewBook}
            />
          </div>
          <div className={styles.formImageArea}>
            <label htmlFor="image" className={styles.lableImage}>
              <CiImageOn className={styles.imageIcon} color="#444444" />
              Escolher imagem
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              className={styles.inputImage}
            />
            {imagePreview && (
              <div className={styles.containerNewImage}>
                <img
                  src={imagePreview}
                  className={styles.imageNewBook}
                  alt="livro"
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.containerDescriptionNewBook}>
          <textarea
            type="text"
            className={styles.inputDescription}
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.containerBtn}>
          <MyButtom
            textButtom={"Cancelar"}
            textColor={"#202020"}
            backgroundColor={"#D5D5D5"}
            handleClick={onClose}
          />
          <MyButtom
            textButtom={"Salvar"}
            textColor={"#FFFFFF"}
            backgroundColor={"#0093E6"}
            handleClick={onSave}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
