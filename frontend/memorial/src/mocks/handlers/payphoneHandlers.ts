import { rest } from "msw";

type Voicemail = {
  sendDate: string;
  voicemailFile: File;
  toUserNickname: string;
};
type SingleVoicemail = {
  voicemailId: number;
  sendDate: string;
  voicemailUrl: string;
  fromUser: string;
  toUser: string;
};

type VoicemailList = {
  voicemailList: [
    {
      voicemailId: number;
      sendDate: string;
      fromNickname: string;
    }
  ];
};

const voicemailList: voicemailList[] = [
  {
    voicemailId: 4,
    sendDate: "2023-09-05 12:50:23",

    fromNickname: "nickname1",
  },
  {
    voicemailId: 3,
    sendDate: "2023-09-03 12:55:10",
    fromNickname: "nickname2",
  },
];

// Voicemail 데이터

const BASE_URL = import.meta.env.VITE_APP_API_URL;
export const payphoneHandlers = [
  rest.get(`${BASE_URL}/api/voicemail`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(voicemails));
  }),
  rest.get(`${BASE_URL}/api/voicemail/:voicemailId`, (req, res, ctx) => {
    // 이곳에서 요청 파라미터를 사용하여 특정 voicemail 응답 데이터를 구성할 수 있습니다.
    const { voicemailId } = req.params;
    const selectedVoicemail = voicemails.find(
      (v) => v.voicemailId === Number(voicemailId)
    );

    if (!selectedVoicemail) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(selectedVoicemail));
  }),
  rest.post(`${BASE_URL}/api/voicemail`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ response: "등록에 성공했습니다." }));
  }),
  rest.delete(`${BASE_URL}/api/voicemail/:voicemailId`, (req, res, ctx) => {
    // 이곳에서 요청 파라미터를 사용하여 삭제 응답 데이터를 구성할 수 있습니다.
    const { voicemailId } = req.params;
    // 삭제가 성공했다고 가정하고 응답합니다.
    return res(ctx.status(200), ctx.json({ response: "삭제에 성공했습니다." }));
  }),
];
