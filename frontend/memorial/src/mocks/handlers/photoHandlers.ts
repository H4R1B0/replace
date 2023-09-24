import { rest } from "msw";
import photos from "../fixtures/photos";

const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const photoHandlers = [
  rest.get(`${BASE_URL}/frame/:sequence`, async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(photos));
  }),
  rest.get(`${BASE_URL}/frame/detail/:photoId`, async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(photos.photos[0]));
  }),
  rest.post(`${BASE_URL}/frame/:sequence`, async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(photos));
  }),
];
