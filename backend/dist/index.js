"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const asyncStorageIMG_1 = require("./utils/asyncStorageIMG");
const promise_1 = __importDefault(require("mysql2/promise"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//        rota buscada                      rota de referencia
app.use("/images", express_1.default.static(path_1.default.join(__dirname, `/images`)));
const pool = promise_1.default.createPool({
    host: "172.19.205.207",
    user: "root",
    password: "admin",
    database: "books_catalog",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
app.get("/books", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM books");
        res.status(200).json(rows);
    }
    catch (err) {
        res.status(400).send("erro ao buscar livros");
    }
});
app.post("/book", asyncStorageIMG_1.imageSave.single("image"), async (req, res) => {
    if (!req.file || !req.body) {
        res.status(400).send("Nenhuma imagem foi enviada.");
        return;
    }
    const formatDate = (date) => {
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
    };
    const data = {
        title: req.body.title,
        autor: req.body.autor,
        publish_date: formatDate(new Date(req.body.publish_date).toLocaleDateString()),
        image: `http://localhost:8080/images/img-${req.file.originalname.replaceAll(/ /g, "-")}`,
        description: req.body.description,
    };
    try {
        await pool.query("INSERT INTO books (title, autor, publish_date, image, description) VALUES (?,?,?,?,?)", [
            data.title,
            data.autor,
            data.publish_date,
            data.image,
            data.description,
        ]);
        res.status(201).send("Livro adicionado");
    }
    catch (err) {
        res.status(400).json({ error: "erro ao adicionar o livro" });
    }
});
app.put("/book/:id", asyncStorageIMG_1.imageSave.single("image"), async (req, res) => {
    if (!req.file || !req.body) {
        res.status(400).send("Nenhuma imagem foi enviada.");
        return;
    }
    const formatDate = (date) => {
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
    };
    const data = {
        title: req.body.title,
        autor: req.body.autor,
        publish_date: formatDate(new Date(req.body.publish_date).toLocaleDateString()),
        image: `http://localhost:8080/images/img-${req.file.originalname.replaceAll(/ /g, "-")}`,
        description: req.body.description,
    };
    try {
        await pool.query("UPDATE books SET title = ?, autor = ?, publish_date = ?, image = ?, description = ? WHERE id = ?", [
            data.title,
            data.autor,
            data.publish_date,
            data.image,
            data.description,
            req.params.id,
        ]);
        res.status(201).send("Livro adicionado");
    }
    catch (err) {
        res.status(400).json({ error: "erro ao adicionar o livro" });
    }
});
app.delete("/book/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM books WHERE id = ?", [req.params.id]);
        res.status(200).send("livro apagado");
    }
    catch (err) {
        res.status(400).json({ error: "erro ao apagar o livro" });
    }
});
app.listen(8080, () => {
    console.log(`servidor rodando na porta 8080`);
});
