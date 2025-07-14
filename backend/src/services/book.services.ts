import { DataBooksToSend } from "../models/IBooks";
import * as bookRepository from "../repositories/book.repository";

const formatDate = (date: string) => {
  const [day, month, year] = date.split("/");
  return [parseInt(day), parseInt(month), parseInt(year)];
};

export const createBook = async (book: DataBooksToSend) => {
  const regex = /^(0[1-9]|[12][0-9]|3[0-1])([\/\-])(0[1-9]|1[0-2])\2(\d{4})$/;
  const dateFormated = formatDate(book.publish_date);
  const date = new Date(dateFormated[2], dateFormated[1] - 1, dateFormated[0]);
  const today = new Date();

  if (!regex.test(book.publish_date))
    throw "Data invalida.( formato valido: dd/mm/yyyy )";

  if (today < date) throw "Data invalida.( Data futura )";

  const data: DataBooksToSend = {
    title: book.title,
    autor: book.autor,
    publish_date: `${dateFormated[2]}-${dateFormated[1]}-${dateFormated[0]}`,
    image: book.image,
    description: book.description,
  };

  return await bookRepository.insertBook(data);
};
