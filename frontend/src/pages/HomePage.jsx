"use client";

import { getData } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { IoIosSearch } from "react-icons/io";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    const response = await getData();
    setBooks(response);
    console.log(response);
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <main className={styles.containerHome}>
      <div className={styles.containerHeader}>
        <div className={styles.header}>
          <p className={styles.bookWorld}>livros</p>
          <button className={styles.btn}>novo</button>
        </div>
        <div className={styles.containerInput}>
          <p>buscar</p>
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
    </main>
  );
}
