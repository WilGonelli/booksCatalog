import { Router } from "express";
import { imageSave } from "../utils/asyncStorageIMG";
import {
  createBook,
  searchBook,
  updateBookInfo,
  deleteBookInfo,
} from "../controllers/book.controller";

const router = Router();

router.get("/books", searchBook);
router.post("/book", imageSave.single("image"), createBook);
router.put("/book/:id", imageSave.single("image"), updateBookInfo);
router.delete("/book/:id", deleteBookInfo);

export default router;
