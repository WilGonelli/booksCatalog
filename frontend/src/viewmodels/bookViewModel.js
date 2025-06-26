import { useState, useEffect } from "react";
import { BookService } from "@/services/booksServices";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [autor, setAutor] = useState("");
  const [description, setDescription] = useState("");
  const [publishDate, setPublishDate] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchBooks = async () => {
    const response = await BookService.getAllBooks();
    setBooks(response);
  };

  const filterBooks = async () => {
    const data = await books.filter((book) =>
      book.title.toLowerCase().includes(inputSearch)
    );
    setBooks(data);
  };

  useEffect(() => {
    if (inputSearch.length > 2 && books.length > 0) {
      filterBooks();
    } else {
      fetchBooks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch]);

  return {
    books,
    inputSearch,
    setInputSearch,
    isModalOpen,
    handleOpenModal: () => setIsModalOpen(true),
    handleCloseModal: () => setIsModalOpen(false),
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
  };
};
