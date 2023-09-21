import { rest, RequestHandler } from "msw";

type Wreath = {
  wreathId: number;
  title: string;
  subTitle: string;
  startDate: string;
  endDate: string;
  flower: number;
  candle: number;
  ribbon: number;
};

type WreathData = {
  data: Wreath[];
};

const BASE_URL = import.meta.env.VITE_APP_API_URL;

const wreathData: WreathData = {
  data: [
    {
      wreathId: 4,
      title: "김싸피를 추모합니다",
      subTitle: "온 마음 다해 애도의 뜻을 전합니다",
      startDate: "2023-09-05",
      endDate: "2023-09-15",
      flower: 3,
      candle: 4,
      ribbon: 5,
    },
    {
      wreathId: 3,
      title: "이싸피를 추모합니다",
      subTitle: "온 마음 다해 애도의 뜻을 전합니다",
      startDate: "2023-09-03",
      endDate: "2023-09-10",
      flower: 3,
      candle: 4,
      ribbon: 5,
    },
  ],
};

export const tributeHandlers: RequestHandler[] = [
  rest.get(`${BASE_URL}/wreath`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        response: wreathData,
      })
    );
  }),

  rest.get(`${BASE_URL}/wreath/:id`, (req, res, ctx) => {
    const id =
      typeof req.params.id === "string" ? req.params.id : req.params.id[0];
    const wreathDetail = wreathData.data.find(
      (wreath) => wreath.wreathId === parseInt(id)
    );

    if (!wreathDetail) {
      return res(ctx.status(404), ctx.json({ message: "wreath not found" }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        response: wreathDetail,
      })
    );
  }),

  // post는 api 변동 가능성 있으므로 후에 작성!
  //   rest.post(`${BASE_URL}/wreath`, async (req, res, ctx) => {
  //     const wreath = await req.json();

  //     wreath.letterId = wreathData.data.length + 1;

  //     wreathData.data.push(wreath);

  //     return res(
  //       ctx.status(201),
  //       ctx.json({
  //         wreathId: wreathData.data.length + 1,
  //         wreath,
  //       })
  //     );
  //   }),
];
