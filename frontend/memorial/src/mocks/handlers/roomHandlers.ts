import { rest } from "msw";
import rooms from "../fixtures/rooms";

const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const roomHandlers = [
  rest.delete(`${BASE_URL}/room/:sequence`, async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "방 데이터 삭제에 성공하였습니다.",
      })
    );
  }),
  rest.get(`${BASE_URL}/user/home`, async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(rooms));
  }),
  rest.put(`${BASE_URL}/room/:sequence`, async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "방의 대상이 등록되었습니다.",
      })
    );
  }),
];
