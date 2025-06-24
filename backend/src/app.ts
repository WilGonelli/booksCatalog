import express from "express";
import path from "path";
import cors from "cors";
import router from "./routes/book.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(__dirname, `/images`)));

app.use(router);

export default app;
