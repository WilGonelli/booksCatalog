import { useBooks } from "@/viewmodels/bookViewModel";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import styles from "./home.module.css";
import ModalConfirm from "@/components/modals/ConfirmModal";
import Modal from "./ModalNewBook";

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const {
    fetchBookDetails,
    book,
    deleteBook,
    isModalOpen,
    handleSeteModalConfirmClose,
    handleSeteModalConfirmOpen,
    isModalConfirmOpen,
    handleCloseModal,
    handleOpenModal,
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
    updateBook,
  } = useBooks();

  useEffect(() => {
    fetchBookDetails(id);
  }, [id]);

  return (
    <div className={styles.containerDefault} style={{ margin: -8 }}>
      <div className={styles.containerHome}>
        {book && (
          <div className={styles.containerDetails}>
            <div className={styles.containerHeaderDetails}>
              <div className={styles.containerButtomsHeader}>
                <Link
                  href={"/"}
                  className={styles.containerButtomsHeader}
                  style={{ cursor: "pointer" }}
                >
                  <FaChevronLeft className={styles.leftIcon} />
                  <p> Voltar </p>
                </Link>
              </div>
              <div
                className={styles.containerButtomsHeader}
                style={{ gap: 32 }}
              >
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  {" "}
                  Editar{" "}
                </p>
                <p
                  className={styles.deleteBtn}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleSeteModalConfirmOpen();
                  }}
                >
                  {" "}
                  Excluir{" "}
                </p>
              </div>
            </div>
            <div className={styles.containerInfos}>
              <div className={styles.containerBookInfo}>
                <h1 className={styles.bookDetailTitle}>{book.title} </h1>
                <div className={styles.containerPublish}>
                  <p>Por {book.autor} </p>
                  <p>
                    Publicado em{" "}
                    {new Date(book.publish_date).toLocaleDateString()}{" "}
                  </p>
                </div>
                <p style={{ textAlign: "justify" }}>{book.description}</p>
              </div>
              <img
                className={styles.imageDetails}
                src={`http://localhost:8081${book.image}`}
                alt={book.title}
              />
            </div>
            <ModalConfirm
              isOpen={isModalConfirmOpen}
              onClose={handleSeteModalConfirmClose}
              onSave={() => deleteBook(id)}
            />
            <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              textModalTitle={"Editar livro"}
              title={title ? title : book.title}
              setTitle={setTitle}
              autor={autor ? autor : book.autor}
              setAutor={setAutor}
              description={description ? description : book.description}
              setDescription={setDescription}
              publishDate={
                publishDate
                  ? new Date(publishDate)
                  : new Date(book.publish_date)
              }
              setPublishDate={setPublishDate}
              setImage={setImage}
              imagePreview={
                imagePreview
                  ? imagePreview
                  : `http://localhost:8081${book.image}`
              }
              setImagePreview={setImagePreview}
              onSave={() => {
                updateBook(id);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
