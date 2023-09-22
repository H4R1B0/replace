import { api } from "./index";

// 녹음한 음성 파일 리스트 조회
export const fetchAudioFileList = async (roomUuid: string) => {
  return await api.get(`/radio/record/${roomUuid}`);
};

// 녹음 음성 파일 상세 조회
export const fetchSingleAudioFile = async (recordVoiceId: string) => {
  return await api.get(`/radio/${recordVoiceId}`);
};

// 녹음 음성 파일 삭제
export const deleteSingleAudioFile = async (recordVoiceId: string) => {
  return await api.delete(`/radio/${recordVoiceId}`);
};

// 방에서 녹음한 음성 파일 등록 (POST)
export const uploadRecordedAudio = async () => {
  return await api.post(`/tel/save?type=record`);
};

// 사용자에게 저장 되어있는 음성 파일 등록 (POST)
// TODO : ( 확장자 검사가 필요한가? )
export const uploadStoredAudio = async () => {
  return await api.post(`/tel/save?type=stored`);
};

// 생성된 AI 음성 조회
export const fetchAIAudio = async () => {
  return await api.get(`/tel/made`);
};
