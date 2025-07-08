import { useBooks } from "@/viewmodels/bookViewModel";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import styles from "./home.module.css";
import ModalConfirm from "@/components/modals/ConfirmModal";

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
                <p style={{ cursor: "pointer" }}> Editar </p>
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
                src={`http://localhost:8080${book.image}`}
                alt={book.title}
              />
            </div>
          </div>
        )}
      </div>
      <ModalConfirm
        isOpen={isModalConfirmOpen}
        onClose={handleSeteModalConfirmClose}
        onSave={() => deleteBook(id)}
      />
    </div>
  );
}
