import { api, Header } from "./index";

type Book = {
  letterId: number;
  title: string;
  writeTime: string;
  content: string;
};

type Letter = {
  title: string;
  content: string;
  writeTime: string;
  sequence: number;
};

type BookList = {
  data: Book[];
};

export const fetchBookList = async (sequence: number) => {
  return await api.get<BookList>(`/letter/${sequence}`, Header());
};

export const fetchBookDetail = async (letterId: number) => {
  return await api.get<Book>(`/letter/detail/${letterId}`, Header());
};

export const createLetter = async (letter: Letter) => {
  return await api.post(`/letter`, letter, Header());
};

export const deleteBook = async (letterId: number) => {
  return await api.delete(`/letter/${letterId}`, Header());
};
