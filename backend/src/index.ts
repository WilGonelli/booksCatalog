import express, { Request, Response } from "express";
import path from "path";
import { imageSave } from "./utils/asyncStorageIMG";
import mysql, { RowDataPacket } from "mysql2/promise";

const app = express();
app.use(express.json());
//        rota buscada                      rota de referencia
app.use("/images", express.static(path.join(__dirname, `/images`)));

const pool = mysql.createPool({
  host: "172.19.205.207",
  user: "root",
  password: "admin",
  database: "books_catalog",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

interface GetBooks extends RowDataPacket {
  id?: number;
  title: string;
  autor: string;
  publish_date: string;
  image: string;
  description: string;
}

interface DataBooksToSend {
  title: string;
  autor: string;
  publish_date: string;
  image: string;
  description: string;
}

app.get("/books", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<GetBooks[]>("SELECT * FROM books");
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).send("erro ao buscar livros");
  }
});

app.post(
  "/book",
  imageSave.single("image"),
  async (req: Request, res: Response) => {
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
      await pool.query(
        "INSERT INTO books (title, autor, publish_date, image, description) VALUES (?,?,?,?,?)",
        [
          data.title,
          data.autor,
          data.publish_date,
          data.image,
          data.description,
        ]
      );
      res.status(201).send("Livro adicionado");
    } catch (err) {
      res.status(400).json({ error: "erro ao adicionar o livro" });
    }
  }
);

app.listen(8080, () => {
  console.log(`servidor rodando na porta 8080`);
});
