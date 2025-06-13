import { Request, Response } from "express";
import * as bookRepository from "../repositories/book.repository";
import { DataBooksToSend } from "../models/IBooks";

export const createBook = async (req: Request, res: Response) => {
  if (
    !req.file ||
    !req.body.title ||
    !req.body.autor ||
    !req.body.publish_date ||
    !req.body.description
  ) {
    res.status(406).send("Todos os campos são obrigatorios.");
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
    await bookRepository.insertBook(data);
    res.status(201).send("Livro cadastrado");
  } catch (err: any) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(409).send("Livro ja existe na base de dados.");
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
    res.status(400).send("erro ao buscar livros");
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
    image: `http://localhost:8080/images/img-${req.file.originalname.replaceAll(
      / /g,
      "-"
    )}`,
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
