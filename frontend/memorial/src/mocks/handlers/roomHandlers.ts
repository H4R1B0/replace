import { rest } from "msw";

const BASE_URL = "http://localhost:8080";
export const roomHandlers = [
  rest.delete(`${BASE_URL}/room`, async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "방 데이터 삭제에 성공하였습니다.",
      })
    );
  }),
];
