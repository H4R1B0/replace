import { rest } from "msw";

// Voicemail 데이터
interface Voicemail {
  voicemailId: number;
  sendDate: string;
  voicemailUrl: string;
  fromUser: string;
  toUser: string;
}

interface VoicemailData {
  voicemailList: Voicemail[];
}

const voicemailList: VoicemailData = {
  voicemailList: [
    {
      voicemailId: 4,
      sendDate: "2023-09-05 12:50:23",
      voicemailUrl: "https://www.youtube.com/watch?v=2ZIpFytCSVc",
      fromUser: "nickname12",
      toUser: "nickname4",
    },
    {
      voicemailId: 3,
      sendDate: "2023-09-03 12:55:10",
      voicemailUrl: "https://www.youtube.com/watch?v=2ZIpFytCSVc",
      fromUser: "nickname4",
      toUser: "nickname3",
    },
  ],
};

const BASE_URL = import.meta.env.VITE_APP_API_URL;
export const payphoneHandlers = [
  rest.get(`${BASE_URL}/api/voicemail`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ Response: voicemailList }));
  }),

  rest.get(`${BASE_URL}/api/voicemail/:voicemailId`, (req, res, ctx) => {
    const inputVoicemailId = req.params.voicemailId;
    const selectedVoicemail = voicemailList.voicemailList.find(
      (value) => value.voicemailId === Number(inputVoicemailId)
    );
    if (!selectedVoicemail) {
      return res(ctx.status(404));
    }
    return res(ctx.status(200), ctx.json({ Response: selectedVoicemail }));
  }),

  rest.post(`${BASE_URL}/api/voicemail`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ response: "등록에 성공했습니다." }));
  }),
  rest.delete(`${BASE_URL}/api/voicemail/:voicemailId`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ response: "삭제에 성공했습니다." }));
  }),
];
