"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncStorageIMG_1 = require("./utils/asyncStorageIMG");
const promise_1 = __importDefault(require("mysql2/promise"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pool = promise_1.default.createPool({
    host: "172.19.205.207",
    user: "root",
    password: "admin",
    database: "books_catalog",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
app.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield pool.query("SELECT * FROM books");
        res.status(200).json(rows);
    }
    catch (err) {
        res.status(400).send("erro ao buscar livros");
    }
}));
app.post("/book", asyncStorageIMG_1.imageSave.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        image: `/image/img${req.file.originalname}`,
        description: req.body.description,
    };
    try {
        yield pool.query("INSERT INTO books (title, autor, publish_date, image, description) VALUES (?,?,?,?,?)", [
            data.title,
            data.autor,
            data.publish_date,
            data.image,
            data.description,
        ]);
        console.log(data);
        res.status(201).send("Livro adicionado");
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: "erro ao adicionar o livro" });
    }
}));
app.listen(8080, () => {
    console.log(`servidor rodando na porta 8080`);
});
