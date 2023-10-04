import { fetchAudioFileList, deleteSingleAudioFile } from "@apis/audio";
import Modal, { ModalProps } from "..";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@components/ui/Button";
import { toast } from "react-hot-toast";

import { useState } from "react";
import styles from "./AudioListModal.module.css";
import AudioPlayer from "@components/ui/AudioPlayer";

export default function AudioListModal({ ...other }: AudioListModalProps) {
  const navigate = useNavigate();
  const { sequence } = useParams();
  if (typeof sequence === "undefined") return;
  const roomSequence = parseInt(sequence);
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: audioList,
  } = useQuery({
    queryKey: ["audioList", roomSequence],
    queryFn: () => fetchAudioFileList(roomSequence),
  });

  const deleteAudioFileMutation = useMutation({
    mutationFn: deleteSingleAudioFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audioList", roomSequence] });
      toast.success("성공적으로 삭제 되었습니다");
      navigate("..");
    },
    onError: (error: Error) => {
      if (error.message === "400") toast.error("삭제에 실패하였습니다.");
    },
  });

  const handleDelete = (voiceId: number) => {
    if (!voiceId) return;
    deleteAudioFileMutation.mutate(voiceId);
  };

  if (isLoading) return "loading";
  if (isError) return `Error`;

  // TODO: 삭제한 이후 리스트 refetching하기, audio.voiceId unique key 문제 해결하기!!!!

  {
    /*TODO: 토글로 누르면 audio가 보이게끔 수정하기 */
  }

  const [voiceToggleStates, setVoiceToggleStates] = useState<
    Record<number, boolean>
  >({});
  const handleToggleClick = (voiceId: number) => {
    setVoiceToggleStates((prevToggleStates) => ({
      ...prevToggleStates,
      [voiceId]: !prevToggleStates[voiceId],
    }));
  };

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

  const audios = audioList?.voiceItems?.map((audio) => (
    <div className={styles.audioCard} key={audio.voiceId}>
      <div onClick={() => handleToggleClick(audio.voiceId)}>
        <p className={styles.audioDate}>
          {formattedDateTime(audio.registDate)} 에 남긴 음성
        </p>
      </div>
      <div>
        {voiceToggleStates[audio.voiceId] && (
          <div>
            <AudioPlayer url={audio.voiceUrl} />

            <Button
              variant="delete"
              onClick={() => handleDelete(audio.voiceId)}
            >
              오디오 삭제하기
            </Button>
          </div>
        )}
      </div>
    </div>
  ));
  return (
    <div className={styles.wrapper}>
      <Modal
        {...other}
        title="남긴 추억을 확인해보세요."
        subtitle="기록을 확인하려면 클릭해보세요."
        buttonLabel="닫기"
        onClose={() => navigate("..")}
      >
        <div>
          {audioList?.voiceItems?.length === 0 && (
            <p className={styles.audioMent}>아직 남긴 추억이 없어요.</p>
          )}
        </div>
        {audios}
        <div>
          <Button variant="nickname" onClick={() => navigate("ai/train")}>
            AI 학습 시키기
          </Button>
        </div>
      </Modal>
    </div>
  );
}

type AudioListModalProps = ModalProps;
