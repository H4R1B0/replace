import { api, Header } from "./index";
import type { PhotoList, Photo } from "types/Photo";

type UploadSinglePhotoRequest = {
  sequence: number;
  photo: File;
};

// 기억의 방 사진 등록
export const uploadSinglePhoto = async ({
  sequence,
  photo,
}: UploadSinglePhotoRequest) => {
  return await api.postPhoto(`/frame/${sequence}`, photo, Header());
};

// 기억의 방 사진 리스트 조회
export const fetchPhotoList = async (sequence: number) => {
  return await api.get<PhotoList>(`/frame/${sequence}`, Header());
};
// 기억의 방 사진 상세 조회
export const fetchSinglePhoto = async (photoId: number) => {
  return await api.get<Photo>(`/frame/detail/${photoId}`, Header());
};

// 기억의 방 사진 삭제
export const deleteSinglePhoto = async (photoId: number) => {
  return await api.delete(`/frame/${photoId}`, Header());
};
