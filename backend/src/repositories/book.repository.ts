import { db } from "../config/book.db";
import { DataBooksToSend, GetBooks } from "../models/IBooks";

export const insertBook = async (book: DataBooksToSend) => {
  const [result] = await db.execute(
    "INSERT INTO books (title, autor, publish_date, image, description) VALUES (?,?,?,?,?)",
    [book.title, book.autor, book.publish_date, book.image, book.description]
  );
  return result;
};

export const getBooks = async () => {
  const [result] = await db.execute<GetBooks[]>("SELECT * FROM books");
  return [result];
};

export const updateBook = async (book: DataBooksToSend, id: string) => {
  const [result] = await db.execute(
    "UPDATE books SET title = ?, autor = ?, publish_date = ?, image = ?, description = ? WHERE id = ?",
    [
      book.title,
      book.autor,
      book.publish_date,
      book.image,
      book.description,
      id,
    ]
  );
  return result;
};

export const deleteBook = async (id: string) => {
  const [result] = await db.execute("DELETE FROM books WHERE id = ?", [id]);
  return result;
};
