import { api } from "./index";

// Voicemail API

// 음성메세지 등록
export const registVoicemail = async () => {
  return await api.post("/voicemail");
};

// 음성메세지 리스트 출력
export const fetchVoicemailList = async () => {
  return await api.get("/voicemail");
};

// 음성메세지 상세 조회
export const fetchSingleVoicemail = async (voicemailId: number) => {
  return await api.get(`/voicemail/${voicemailId}`);
};

// 음성메세지 삭제
export const deleteSingleVoicemail = async (voicemailId: number) => {
  return await api.delete(`/voicemail/${voicemailId}`);
};
