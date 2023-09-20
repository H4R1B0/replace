import { rest, RequestHandler } from "msw";

type Letter = {
  letterId: number;
  title: string;
  content?: string; // content는 선택적 속성으로 변경
  writeTime: string;
};

const letters: Letter[] = [
  {
    letterId: 3,
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

export const handlers: RequestHandler[] = [
  rest.get("https://pokeapi.co/api/v2/letter/list", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        response: letters,
      })
    );
  }),

  rest.get("https://pokeapi.co/api/v2/letter/detail/:id", (req, res, ctx) => {
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

  rest.post("https://pokeapi.co/api/v2/letter", (req, res, ctx) => {
    const parsedBody = JSON.parse(req.body as string) as Partial<Letter>;

    if (
      !parsedBody ||
      typeof parsedBody !== "object" ||
      !parsedBody.title ||
      !parsedBody.writeTime
    ) {
      return res(ctx.status(400), ctx.text("No valid body provided"));
    }

    // 새로운 letterId 생성
    const newLetterId = Math.max(...letters.map((l) => l.letterId), 0) + 1;
    parsedBody.letterId = newLetterId;

    // letters 배열에 새로운 편지 추가
    letters.push(parsedBody as Letter);

    // 생성된 데이터와 함께 응답
    return res(
      ctx.status(201),
      ctx.json({
        response: parsedBody,
      })
    );
  }),
];

// import { rest } from "msw";

// export const handlers = [
//   rest.get("https://pokeapi.co/api/v2/pokemon/", async (req, res, ctx) => {
//     return res(
//       ctx.json({
//         count: 1118,
//         next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
//         previous: null,
//         results: [
//           {
//             name: "이상해씨",
//             url: "https://pokeapi.co/api/v2/pokemon/1/",
//           },
//           {
//             name: "이상해풀",
//             url: "https://pokeapi.co/api/v2/pokemon/2/",
//           },
//           {
//             name: "이상해꽃",
//             url: "https://pokeapi.co/api/v2/pokemon/3/",
//           },
//           {
//             name: "파이리",
//             url: "https://pokeapi.co/api/v2/pokemon/4/",
//           },
//           {
//             name: "리자드",
//             url: "https://pokeapi.co/api/v2/pokemon/5/",
//           },
//           {
//             name: "리자몽",
//             url: "https://pokeapi.co/api/v2/pokemon/6/",
//           },
//           {
//             name: "꼬부기",
//             url: "https://pokeapi.co/api/v2/pokemon/7/",
//           },
//           {
//             name: "어니부기",
//             url: "https://pokeapi.co/api/v2/pokemon/8/",
//           },
//           {
//             name: "거북왕",
//             url: "https://pokeapi.co/api/v2/pokemon/9/",
//           },
//         ],
//       })
//     );
//   }),
// ];
