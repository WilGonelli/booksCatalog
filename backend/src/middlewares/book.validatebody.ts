import { NextFunction, Request, Response } from "express";

export const validateBook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !req.file ||
      !req.body.title ||
      !req.body.autor ||
      !req.body.publish_date ||
      !req.body.description
    ) {
      throw "Todos os campos são obrigatorios";
    }
    next();
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
