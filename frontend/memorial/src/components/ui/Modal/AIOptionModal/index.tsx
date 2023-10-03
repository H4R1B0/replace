import Modal, { ModalProps } from "..";
import Button from "@components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAIAudio } from "@apis/audio";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AIOptionModal({ ...other }: AIOptionModalProps) {
  const navigate = useNavigate();
  const { sequence } = useParams();
  if (typeof sequence === "undefined") return;
  const roomSequence = parseInt(sequence);
  const [situation, setSituation] = useState("");

  const { data: AIResponse } = useQuery({
    queryKey: ["AIResponse", roomSequence, situation],
    queryFn: () => fetchAIAudio(roomSequence, situation),
    enabled: !!situation,
    retry: 0,
    onError: () => {
      toast.error("아직 학습된 목소리가 없습니다");
    },
  });

  const AIVoice = (
    <audio controls>
      <source src={AIResponse?.voiceFileUrl} type="audio/wav" />
    </audio>
  );

  // TODO: 만약에 AIResponse가 없다면, 없다는 상황 하나 만들기, 버튼 눌렀을때 AIVoice가 나오도록 처리하기
  return (
    <Modal {...other} buttonLabel="close" onClose={() => navigate("..")}>
      <p>AIOptionModal</p>
      <Button onClick={() => setSituation("CONSOLATION")}> CONSOLATION </Button>
      <Button onClick={() => setSituation("SAFETY")}> SAFETY </Button>
      <Button onClick={() => setSituation("ENCOURAGE")}> ENCOURAGE </Button>
      {AIVoice}
      <Button onClick={() => setSituation("THANKS")}> THANKS </Button>
      <Button onClick={() => setSituation("WELCOME")}> WELCOME </Button>
      <Button onClick={() => setSituation("CONGRATULATION")}>
        CONGRATULATION
      </Button>
    </Modal>
  );
}

type AIOptionModalProps = ModalProps;
