import { api } from "./index";

// 방에서 녹음한 음성 & 업로드한 파일 파일 등록 (POST)
export const uploadRecordedAudio = async (sequence: number) => {
  return await api.post(`/tel/${sequence}`);
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
