import { getData } from "@/utils/api";

export const BookService = {
  getAllBooks: async () => {
    const data = await getData();
    return data;
  },
};
