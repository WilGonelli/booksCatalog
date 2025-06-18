import { Router } from "express";
import { imageSave } from "../utils/asyncStorageIMG";
import {
  createBook,
  searchBook,
  updateBookInfo,
  deleteBookInfo,
} from "../controllers/book.controller";
import { validateBook } from "../middlewares/book.validatebody";

const router = Router();

router.get("/books", searchBook);
router.post("/book", imageSave.single("image"), validateBook, createBook);
router.put(
  "/book/:id",
  imageSave.single("image"),
  validateBook,
  updateBookInfo
);
router.delete("/book/:id", deleteBookInfo);

export default router;
