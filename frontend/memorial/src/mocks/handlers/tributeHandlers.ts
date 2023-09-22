import { rest, RequestHandler } from "msw";

type Wreath = {
  wreathId: number;
  title: string;
  subTitle: string;
  startDate: Date;
  endDate: Date;
  flower: number;
  candle: number;
  ribbon: number;
};

type WreathData = {
  data: Wreath[];
};

function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const BASE_URL = import.meta.env.VITE_APP_API_URL;

const wreathData: WreathData = {
  data: [
    {
      wreathId: 1,
      title: "김싸피를 추모합니다",
      subTitle: "온 마음 다해 애도의 뜻을 전합니다",
      startDate: parseDate("2021-09-02"),
      endDate: parseDate("2023-09-15"),
      flower: 1,
      candle: 2,
      ribbon: 4,
    },
    {
      wreathId: 2,
      title: "이싸피를 추모합니다",
      subTitle: "온 마음 다해 애도의 뜻을 전합니다",
      startDate: parseDate("2023-09-01"),
      endDate: parseDate("2023-09-15"),
      flower: 4,
      candle: 4,
      ribbon: 0,
    },
    {
      wreathId: 3,
      title: "황싸피를 추모합니다",
      subTitle: "온 마음 다해 애도의 뜻을 전합니다",
      startDate: parseDate("2020-01-05"),
      endDate: parseDate("2023-09-15"),
      flower: 2,
      candle: 10,
      ribbon: 4,
    },
    {
      wreathId: 4,
      title: "호싸피를 추모합니다",
      subTitle: "온 마음 다해 애도의 뜻을 전합니다",
      startDate: parseDate("2023-03-23"),
      endDate: parseDate("2023-09-15"),
      flower: 5,
      candle: 6,
      ribbon: 1,
    },
    {
      wreathId: 5,
      title: "루싸피를 추모합니다",
      subTitle: "온 마음 다해 애도의 뜻을 전합니다",
      startDate: parseDate("2013-09-05"),
      endDate: parseDate("2023-09-15"),
      flower: 3,
      candle: 9,
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
