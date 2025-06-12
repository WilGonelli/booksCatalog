import express from "express";
import path from "path";
import router from "./routes/book.routes";

const app = express();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, `/images`)));

app.use(router);

export default app;
