import { Request, Response } from "express";
import * as bookRepository from "../repositories/book.repository";
import { DataBooksToSend } from "../models/IBooks";
import * as bookservice from "../services/book.services";

const validateBook = (body: DataBooksToSend, file: any) => {
  const book = {
    title: body.title,
    autor: body.autor,
    publish_date: body.publish_date,
    image: `/images/img-${file.originalname.replaceAll(/ /g, "-")}`,
    description: body.description,
  };
  return book;
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const book: DataBooksToSend = validateBook(req.body, req.file);
    const result = await bookservice.createBook(book);
    res.status(201).send(result);
  } catch (err: any) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ message: "Livro ja existe na base de dados." });
      return;
    }
    res.status(400).json({ error: err, type: typeof err });
  }
};

export const searchBook = async (req: Request, res: Response) => {
  try {
    const [rows] = await bookRepository.getBooks();
    res.status(200).json(rows);
  } catch (err) {
    res.status(404).send("erro ao buscar livros");
  }
};

export const updateBookInfo = async (req: Request, res: Response) => {
  if (!req.file || !req.body) {
    res.status(400).send("Nenhuma imagem foi enviada.");
    return;
  }
  const formatDate = (date: string) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };
  const data: DataBooksToSend = {
    title: req.body.title,
    autor: req.body.autor,
    publish_date: formatDate(
      new Date(req.body.publish_date).toLocaleDateString()
    ),
    image: `/images/img-${req.file.originalname.replaceAll(/ /g, "-")}`,
    description: req.body.description,
  };
  try {
    await bookRepository.updateBook(data, req.params.id);
    res.status(201).send("Livro adicionado");
  } catch (err) {
    res.status(400).json({ error: "erro ao adicionar o livro" });
  }
};

export const deleteBookInfo = async (req: Request, res: Response) => {
  try {
    await bookRepository.deleteBook(req.params.id);
    res.status(200).send("livro apagado");
  } catch (err) {
    res.status(400).json({ error: "erro ao apagar o livro" });
  }
};
