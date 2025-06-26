"use client";

import styles from "./home.module.css";
import { IoIosSearch } from "react-icons/io";
import { useBooks } from "@/viewmodels/bookViewModel";
import Modal from "./ModalNewBook";

export default function HomePage() {
  const {
    books,
    inputSearch,
    setInputSearch,
    isModalOpen,
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
    image,
    setImage,
    imagePreview,
    setImagePreview,
  } = useBooks();
  return (
    <main className={styles.containerHome}>
      <div className={styles.containerHeader}>
        <div className={styles.header}>
          <p className={styles.bookWorld}>livros</p>
          <button className={styles.btn} onClick={handleOpenModal}>
            novo
          </button>
        </div>
        <div className={styles.containerInput}>
          <input
            className={styles.input}
            placeholder="Buscar"
            value={inputSearch}
            onChange={(e) => {
              setInputSearch(e.target.value);
            }}
          />
          <IoIosSearch className={styles.searchIcon} />
        </div>
      </div>
      {books.length > 0 && (
        <div className={styles.containerBooks}>
          {books.map((book) => {
            return (
              <div key={book.id} className={styles.containerBook}>
                <div className={styles.containerImage}>
                  <img
                    className={styles.image}
                    src={`http://localhost:8080${book.image}`}
                  />
                </div>
                <div className={styles.contaonerInfo}>
                  <p className={styles.title}>{book.title}:</p>
                  <p className={styles.description}>{book.description}:</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        textModalTitle={"Novo livro"}
        title={title}
        setTitle={setTitle}
        autor={autor}
        setAutor={setAutor}
        description={description}
        setDescription={setDescription}
        publishDate={publishDate}
        setPublishDate={setPublishDate}
        image={image}
        setImage={setImage}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
      />
    </main>
  );
}
