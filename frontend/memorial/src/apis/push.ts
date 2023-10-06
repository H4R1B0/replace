import { api, Header } from "./index";
import { pushList } from "types/Push";

// 알림 조회
export const fetchNotificationList = async () => {
  return await api.get<pushList>(`/alarm`, Header());
};
// 알림 삭제
export const deleteSingleNotification = async (alarmId: number) => {
  return await api.delete(`/alarm/${alarmId}`, Header());
};
