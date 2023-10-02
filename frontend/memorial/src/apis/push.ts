import { api, Header } from "./index";
import { pushList } from "types/Push";

// 알림 조회
export const fetchAudioFileList = async () => {
  return await api.get<pushList>(`/alarm`, Header());
};

// 녹음 음성 파일 삭제
export const deleteSingleAudioFile = async (alarmId: number) => {
  return await api.delete(`/alarm/${alarmId}`, Header());
};
