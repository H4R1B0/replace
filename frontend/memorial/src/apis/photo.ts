import { api } from "./index";
import type { PhotoList, Photo } from "types/Photo";

// 기억의 방 사진 등록
export const uploadSinglePhoto = async (sequence: number) => {
  return await api.post<Photo>(`/frame/${sequence}`);
};

// 기억의 방 사진 리스트 조회
export const fetchPhotoList = async (sequence: number) => {
  return await api.get<PhotoList>(`/frame/${sequence}`);
};
// 기억의 방 사진 상세 조회
export const fetchSinglePhoto = async (photoId: number) => {
  return await api.get<Photo>(`/frame/detail/${photoId}`);
};

// 기억의 방 사진 삭제
export const deleteSinglePhoto = async (photoId: number) => {
  return await api.delete(`/frame/${photoId}`);
};
