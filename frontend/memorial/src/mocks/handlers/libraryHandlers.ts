import { rest, RequestHandler } from "msw";

type Letter = {
  letterId: number;
  title: string;
  content?: string; // content는 선택적 속성으로 변경
  writeTime: string;
};
const BASE_URL = import.meta.env.VITE_APP_API_URL;
const letters: Letter[] = [
  {
    letterId: 1,
    title: "은겸에게",
    content: "은겸아 잘 지내니?",
    writeTime: "2023-09-05T14:30:00",
  },
  {
    letterId: 2,
    title: "은겸에게2",
    writeTime: "2023-09-06T14:30:00",
  },
];

export const libraryHandlers: RequestHandler[] = [
  rest.get(`${BASE_URL}/letter/list`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        response: letters,
      })
    );
  }),

  rest.get(`${BASE_URL}/letter/detail/:id`, (req, res, ctx) => {
    const id =
      typeof req.params.id === "string" ? req.params.id : req.params.id[0];
    const letterDetail = letters.find(
      (letter) => letter.letterId === parseInt(id)
    );

    if (!letterDetail) {
      return res(ctx.status(404), ctx.json({ message: "Letter not found" }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        response: letterDetail,
      })
    );
  }),

  rest.post(`${BASE_URL}/letter`, async (req, res, ctx) => {
    const letter = await req.json();

    letter.letterId = letters.length + 1;

    letters.push(letter);

    return res(
      ctx.status(201),
      ctx.json({
        letterId: letters.length + 1,
        letter,
      })
    );
  }),

  rest.delete(`${BASE_URL}/letter/:id`, (req, res, ctx) => {
    const idParam = req.params.id;
    if (typeof idParam === "string") {
      const id = parseInt(idParam, 10);
      const letterIndex = letters.findIndex((letter) => letter.letterId === id);
      letters.splice(letterIndex, 1);
      return res(ctx.json({ message: "삭제 되었습니다." }));
    } else if (typeof idParam === "number") {
      const letterIndex = letters.findIndex(
        (letter) => letter.letterId === idParam
      );
      letters.splice(letterIndex, 1);
      return res(ctx.json({ message: "삭제 되었습니다." }));
    }
  }),
];
