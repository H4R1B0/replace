import { api, Header } from "./index";

type Voicemail = {
  voicemailId: number;
  sendDate: string;
  fromUserNickname: string;
  voicemailUrl?: string;
};

type VoicemailList = {
  voicemails: Voicemail[];
};

// Voicemail API
export type RegisterVoicemailRequest = {
  request: {
    toUserNickname: string;
  };
  file: File;
};

// 음성메세지 리스트 조회
export const fetchVoicemailList = async () => {
  return await api.get<VoicemailList>("/voicemail", Header());
};

// 음성메세지 상세 조회
export const fetchVoicemail = async (voicemailId: number) => {
  return await api.get<Voicemail>(`/voicemail/${voicemailId}`, Header());
};

// 음성메세지 삭제
export const deleteVoicemail = async (voicemailId: number) => {
  return await api.delete(`/voicemail/${voicemailId}`, Header());
};

// 음성메세지 등록
export const registVoicemail = async ({
  request,
  file,
}: RegisterVoicemailRequest) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("request", JSON.stringify(request));
  return await api.postVoicemail(`/voicemail`, { request, file }, Header());
};
