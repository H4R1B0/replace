import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import AudioPlayer from "@components/ui/AudioPlayer";
// import PATH from "@constants/path";
import styles from "./VoiceMailListModal.module.css";
import Toast from "react-hot-toast";

import { fetchVoicemailList, deleteVoicemail } from "@apis/payphone";

type VoiceMailListModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function VoiceMailListModal({
  isOpen,
  onClose,
}: VoiceMailListModalProps) {
  const navigate = useNavigate();
  const nickname = sessionStorage.getItem("nickname");
  const QueryClient = useQueryClient();

  // 각 voicemail에 대한 토글 상태 배열 초기화
  const [voiceToggleStates, setVoiceToggleStates] = useState<
    Record<number, boolean>
  >({});
  // 클릭 이벤트 핸들러
  const handleToggleClick = (voicemailId: number) => {
    // 해당 voicemailId에 대한 토글 상태를 토글
    setVoiceToggleStates((prevToggleStates) => ({
      ...prevToggleStates,
      [voicemailId]: !prevToggleStates[voicemailId],
    }));
  };

  const {
    isLoading,
    isError,
    data: voicemailList,
  } = useQuery({
    queryKey: ["voicemailList"],
    queryFn: () => fetchVoicemailList(),
  });

  const deleteVoicemailMutation = useMutation({
    mutationFn: deleteVoicemail,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["voicemailList"] });
      //   console.log("delete success");
      //   navigate(PATH.PAYPHONE);
      navigate(`/payphone/${nickname}`);
      Toast.success("음성이 성공적으로 삭제되었습니다.", {
        duration: 3000,
      });
    },
    onError: () => {
      Toast.error("음성 삭제에 실패했습니다");
    },
  });

  const handleDelete = (voicemailId: number) => {
    if (!voicemailId) return;
    // console.log(voicemailId);
    deleteVoicemailMutation.mutate(voicemailId);
    onClose();
  };
  if (isLoading) return "loading";
  if (isError) return `Error`;

  // 날짜만 출력
  function formattedDateTime(isoDateString: string) {
    const date = new Date(isoDateString);
    const hours = date.getHours() % 12 || 12; // 12시간 형식으로 시간을 얻음
    // const amPm = date.getHours() >= 12 ? "오후" : "오전"; // AM 또는 PM 설정
    const formattedDateTime = `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")} ${""} ${hours.toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    return formattedDateTime;
  }

  return (
    <div>
      <Modal
        modalOpen={isOpen}
        onClose={onClose}
        title="당신을 위한 보이스메일이 도착했습니다."
        subtitle="기록을 확인하려면 클릭해보세요."
        buttonLabel="닫기"
      >
        <div className={styles.wrapper}>
          {voicemailList?.voicemails.length === 0 && (
            <div>
              <p className={styles.voiceMent}>아직 도착하지 않았어요.</p>
              <p className={styles.voiceMent}>조금만 기다려주실래요.</p>
            </div>
          )}
          {voicemailList?.voicemails.map((voicemail) => (
            <div className={styles.voiceCard} key={voicemail.voicemailId}>
              <div
                className={styles.voiceUserInfo}
                onClick={() => handleToggleClick(voicemail.voicemailId)}
              >
                <p>{voicemail.fromUserNickname}님이 남긴 보이스메일</p>
                <p className={styles.voiceDate}>
                  {formattedDateTime(voicemail.sendDate)}
                </p>
              </div>
              {voiceToggleStates[voicemail.voicemailId] && (
                <div className={styles.voiceToggle}>
                  {voicemail.voicemailUrl && (
                    <AudioPlayer url={voicemail.voicemailUrl} />
                  )}
                  <Button
                    variant="delete"
                    onClick={() => handleDelete(voicemail.voicemailId)}
                  >
                    음성 삭제하기
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
