import { rest } from "msw";
import audios from "@mocks/fixtures/audios";

const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const audioHandlers = [
  rest.post(`${BASE_URL}/tel/:sequence`, async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "저장된 파일이 등록되었습니다.",
      })
    );
  }),
  rest.get(`${BASE_URL}/radio/:sequence`, async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(audios));
  }),
];
