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
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <main className={styles.containerHome}>
      {books.length > 0 && (
        <>
          <div className={styles.containerTitle}>
            <div className={styles.title}>
              <p>livros</p>
              <p>botao</p>
            </div>
            <div className={styles.containerInput}>
              <p>buscar</p>
              <IoIosSearch className={styles.searchIcon} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
