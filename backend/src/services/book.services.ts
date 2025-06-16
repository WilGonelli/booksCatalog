import { DataBooksToSend } from "../models/IBooks";
import * as bookRepository from "../repositories/book.repository";

const formatDate = (date: string) => {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};

export const createBook = async (book: DataBooksToSend, image: string) => {
  console.log(book.publish_date);
  const data: DataBooksToSend = {
    title: book.title,
    autor: book.autor,
    publish_date: formatDate(new Date(book.publish_date).toLocaleDateString()),
    image: image,
    description: book.description,
  };

  const regex = /^(0[1-9]|1[0-2])([\/\-])(0[1-9]|[12][0-9]|3[0-1])\2(\d{4})$/;
  if (!regex.test(book.publish_date)) {
    throw "Data invalida.( formato valido: mm/dd/yyyy )";
  }
  const date = new Date(book.publish_date);
  const today = new Date();
  if (today < date) throw "Data invalida.( Data futura )";

  return await bookRepository.insertBook(data);
};
