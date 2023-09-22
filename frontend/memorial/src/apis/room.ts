import { api } from "./index";

// TODO : roomUuid 를 어떻게 전달받아야 하는지 알 것
// 내 집 조회 => 방(집) 리스트 조회

// 기억의 방(집) 삭제
export const deleteSingleRoom = async () => {
  return await api.delete("/room");
};

// 기억의 방(집) 대상 등록
export const registRoomTarget = async () => {
  return await api.put("/room");
};
// 기억의 방(집) 상세 조회
