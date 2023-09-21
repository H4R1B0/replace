import { api } from "./index";

// TODO : roomUuid 를 어떻게 전달받아야 하는지 알 것
// 기억의 방 삭제
export const deleteSingleRoom = async () => {
  return await api.delete("/room");
};

// 기억의 방 대상 등록

// 기억의 방 조회
