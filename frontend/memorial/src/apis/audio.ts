import { api } from "./index";

type UploadSingleAudioRequest = {
  sequence: number;
  audio: File;
};

export const uploadSingleAudio = async ({
  sequence,
  audio,
}: UploadSingleAudioRequest) => {
  return await api.postAudio(`/tel/${sequence}`, audio);
};

// 녹음한 음성 파일 리스트 조회 (수정완)
export const fetchAudioFileList = async (sequence: number) => {
  return await api.get(`/radio/${sequence}`);
};

// 녹음 음성 파일 상세 조회
export const fetchSingleAudioFile = async (voiceId: number) => {
  return await api.get(`/radio/detail/${voiceId}`);
};

// 녹음 음성 파일 삭제
export const deleteSingleAudioFile = async (voiceId: string) => {
  return await api.delete(`/radio/${voiceId}`);
};

// 생성된 AI 음성 조회
// export const fetchAIAudio = async () => {
//   return await api.get(`/tel/made`);
// };
