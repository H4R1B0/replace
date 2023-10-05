import Modal, { ModalProps } from "..";
import Button from "@components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAIAudio } from "@apis/audio";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./AIOptionModal.module.css";

export default function AIOptionModal({ ...other }: AIOptionModalProps) {
  const navigate = useNavigate();
  const { sequence } = useParams();
  if (typeof sequence === "undefined") return;
  const roomSequence = parseInt(sequence);
  const [situation, setSituation] = useState("");
  const { nickname } = useParams();
  const username = nickname ?? "";

  const { data: AIResponse } = useQuery({
    queryKey: ["AIResponse", roomSequence, situation],
    queryFn: () => fetchAIAudio(username, roomSequence, situation),
    enabled: !!situation,
    retry: 0,
    onError: () => {
      toast.error("아직 학습된 목소리가 없습니다");
    },
  });

  const AIVoice = (
    <audio controls className={styles.audioBox}>
      <source src={AIResponse?.voiceFileUrl} type="audio/wav" />
    </audio>
  );

  // TODO: 만약에 AIResponse가 없다면, 없다는 상황 하나 만들기, 버튼 눌렀을때 AIVoice가 나오도록 처리하기
  return (
    <Modal
      {...other}
      buttonLabel="닫기"
      onClose={() => navigate("..")}
      title="AI 라디오"
      subtitle="도착한 사연을 들어보세요"
    >
      <div className={styles.wrapper}>
        <div>
          <Button onClick={() => setSituation("CONSOLATION")}>위로</Button>
          <Button onClick={() => setSituation("SAFETY")}> 안부 </Button>
        </div>
        <div>
          <Button onClick={() => setSituation("ENCOURAGE")}> 격려 </Button>
          <Button onClick={() => setSituation("THANKS")}> 감사 </Button>
        </div>
        <div>
          <Button onClick={() => setSituation("WELCOME")}> 인사 </Button>
          <Button onClick={() => setSituation("CONGRATULATION")}>축하</Button>
        </div>
        <div className={styles.audioBox}>{AIResponse && AIVoice}</div>
      </div>
    </Modal>
  );
}

type AIOptionModalProps = ModalProps;
