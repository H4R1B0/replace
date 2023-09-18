import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:4000/tests", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        sick: [
          {
            sickCd: "A00",
            sickNm: "콜레라",
          },
          {
            sickCd: "A01",
            sickNm: "장티푸스 및 파라티푸스",
          },
        ],
      })
    );
  }),
];
