import { getData, insertBook, deleteBook, updateBook } from "@/utils/api";

export const BookService = {
  getAllBooks: async () => {
    const data = await getData();
    return data;
  },

  getOneBook: async (id) => {
    const data = await getData();
    const book = data.filter((book) => parseInt(book.id) === parseInt(id));
    return book;
  },

  insertNewBook: async ({ book }) => {
    await insertBook({ book });
  },

  deleteBookById: async ({ id }) => {
    await deleteBook({ id });
  },

  updateBookById: async ({ id, book }) => {
    await updateBook({ id, book });
  },
};
