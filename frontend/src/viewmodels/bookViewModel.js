import { useState, useEffect } from "react";
import { BookService } from "@/services/booksServices";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [inputSearch, setInputSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
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

  const fetchBookDetails = async (id) => {
    const response = await BookService.getOneBook(id);
    if (response.length > 0) {
      setAutor(response[0].autor);
      setTitle(response[0].title);
      setDescription(response[0].description);
      setPublishDate(new Date(response[0].publish_date));
      setBook(response[0]);
    }
  };

  const postBook = async () => {
    const book = {
      title: title,
      autor: autor,
      description: description,
      publishDate: new Date(publishDate).toLocaleString().split(",")[0],
      image: image,
    };
    await BookService.insertNewBook({ book });
    resetVariables();
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await BookService.deleteBookById({ id });
  };

  const updateBook = async (id) => {
    const book = {
      title: title,
      autor: autor,
      description: description,
      publishDate: new Date(publishDate).toLocaleString().split(",")[0],
      image: image,
    };
    await BookService.updateBookById({ id, book });
    resetVariables();
    fetchBookDetails(id);
  };

  const filterBooks = () => {
    const data = books.filter((book) =>
      book.title.toLowerCase().includes(inputSearch)
    );
    setBooks(data);
  };

  const resetVariables = () => {
    setIsModalOpen(false);
    setTitle("");
    setAutor("");
    setDescription("");
    setImage(null);
    setImagePreview(null);
    setPublishDate(null);
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
    handleCloseModal: resetVariables,
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
    postBook,
    fetchBookDetails,
    book,
    deleteBook,
    isModalConfirmOpen,
    handleSeteModalConfirmOpen: () => setIsModalConfirmOpen(true),
    handleSeteModalConfirmClose: () => setIsModalConfirmOpen(false),
    updateBook,
  };
};
