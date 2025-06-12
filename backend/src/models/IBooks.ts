import { RowDataPacket } from "mysql2/promise";

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

export { GetBooks, DataBooksToSend };
