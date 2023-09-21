import { api, Header } from "./index";

// TODO : roomUuid 를 어떻게 전달받아야 하는지 알 것
// 내 집 조회 => 방 리스트 조회

// 기억의 방 삭제
export const deleteSingleRoom = async () => {
  return await api.delete("/room");
};

// 기억의 방 대상 등록
export const registRoomTarget = async () => {
  return await api.put("/room");
};
// 기억의 방 상세 조회

// 기억의 방 사진 등록
export const uploadSinglePhoto = async () => {
  return await api.post("/frame");
};

// 기억의 방 사진 리스트 조회
export const fetchPhotoList = async () => {
  return await api.get("/frame");
};
// TODO: 기억의 방 사진 상세 조회

// 기억의 방 사진 삭제
export const deleteSinglePhoto = async (photoId: string) => {
  return await api.delete(`/frame/${photoId}`);
};
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

// 방에서 녹음한 음성 파일 등록

// 사용자에게 저장 되어있는 음성 파일 등록
// TODO : ( 확장자 검사가 필요한가? )

// 생성된 AI 음성 조회
