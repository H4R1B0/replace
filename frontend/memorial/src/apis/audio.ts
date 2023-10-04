import { api, Header } from "./index";
import { AIAudioBySituation, AudioList, AI } from "types/Audio";

type UploadSingleAudioRequest = {
  sequence: number;
  audio: File;
};

// 녹음한 음성 파일 업로드, 혹은 가지고 있는 음성 파일 업로드
export const uploadSingleAudio = async ({
  sequence,
  audio,
}: UploadSingleAudioRequest) => {
  return await api.postAudio(`/tel/${sequence}`, audio, Header());
};

// 녹음한 음성 파일 리스트 조회 (수정완)
export const fetchAudioFileList = async (sequence: number) => {
  return await api.get<AudioList>(`/radio/${sequence}`, Header());
};

// 녹음 음성 파일 상세 조회
export const fetchSingleAudioFile = async (voiceId: number) => {
  return await api.get(`/radio/detail/${voiceId}`, Header());
};

// 녹음 음성 파일 삭제
export const deleteSingleAudioFile = async (voiceId: number) => {
  return await api.delete(`/radio/${voiceId}`, Header());
};

// 생성된 AI 음성 조회
export const fetchAIAudio = async (sequence: number, situation: string) => {
  const queryString = new URLSearchParams({ situation }).toString();
  const pathWithQuery = `/tel/${sequence}?${queryString}`;
  return await api.get<AIAudioBySituation>(pathWithQuery, Header());
};

// AI 음성 학습하기
export const trainAIAudio = async (ai: AI) => {
  return await api.post(`/ai/training`, ai, Header());
};
