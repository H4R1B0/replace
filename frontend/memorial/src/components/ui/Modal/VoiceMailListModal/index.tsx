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
    onError: (error) => {
      console.log(error);
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

  return (
    <div>
      <Modal
        modalOpen={isOpen}
        onClose={onClose}
        title="다른 사람이 남긴 기록을 확인해보세요"
        subtitle="기록을 확인하려면 클릭해보세요."
        buttonLabel="닫기"
      >
        <div className={styles.wrapper}>
          {voicemailList?.voicemails.map((voicemail) => (
            <div className={styles.voiceCard} key={voicemail.voicemailId}>
              <div
                className={styles.voiceUserInfo}
                onClick={() => handleToggleClick(voicemail.voicemailId)}
              >
                <p>{voicemail.fromUserNickname}</p>
                <p>{voicemail.sendDate}</p>
              </div>
              {voiceToggleStates[voicemail.voicemailId] && (
                <div className={styles.voiceToggle}>
                  {voicemail.voicemailUrl && (
                    <AudioPlayer url={voicemail.voicemailUrl} />
                  )}
                  <Button onClick={() => handleDelete(voicemail.voicemailId)}>
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
