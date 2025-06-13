import multer from "multer";
import fs from "fs";
import path from "path";

const imageStorageDir = path.join(__dirname, "../images");

if (!fs.existsSync(imageStorageDir)) {
  fs.mkdirSync(imageStorageDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageStorageDir);
  },
  filename: (req, file, cb) => {
    const filename = `img-${file.originalname.replaceAll(/ /g, "-")}`;
    cb(null, filename);
  },
});

export const imageSave = multer({ storage: storage });
