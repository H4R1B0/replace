import { api, Header } from "./index";
import { AudioList } from "types/Audio";

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
export const deleteSingleAudioFile = async (voiceId: string) => {
  return await api.delete(`/radio/${voiceId}`, Header());
};

// 생성된 AI 음성 조회
// export const fetchAIAudio = async () => {
//   return await api.get(`/tel/made`);
// };
