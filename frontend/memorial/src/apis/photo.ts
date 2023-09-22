import { api } from "./index";
import type { PhotoList, Photo } from "types/Photo";

// 기억의 방 사진 등록
export const uploadSinglePhoto = async () => {
  return await api.post<Photo>("/frame");
};

// 기억의 방 사진 리스트 조회
export const fetchPhotoList = async () => {
  return await api.get<PhotoList>("/frame");
};
// TODO: 기억의 방 사진 상세 조회

// 기억의 방 사진 삭제
export const deleteSinglePhoto = async (photoId: string) => {
  return await api.delete(`/frame/${photoId}`);
};
