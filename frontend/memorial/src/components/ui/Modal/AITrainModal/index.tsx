import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trainAIAudio } from "@apis/audio";
import Button from "@components/ui/Button";
import Modal, { ModalProps } from "..";
import { useParams, useNavigate } from "react-router-dom";
import SegmentSelector from "@components/ui/SegmentSelector";

import toast from "react-hot-toast";

export default function AITrainModal({ ...other }: AITrainModalProps) {
  const navigate = useNavigate();
  const { sequence } = useParams();
  const roomSequence = parseInt(sequence ?? "");

  const queryClient = useQueryClient();
  const [gender, setGender] = useState("F");

  const trainAIAudioMutation = useMutation({
    mutationFn: trainAIAudio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai"] });
      toast.success("성공적으로 AI 학습 요청이 어쩌구");
      navigate("..");
    },
    onError: (error: Error) => {
      if (error.message === "400")
        toast.error("AI 학습 요청에 실패했습니다 어쩌구");
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trainAIAudioMutation.mutate({
      sequence: roomSequence,
      gender,
    });
  };

  return (
    <Modal
      {...other}
      buttonLabel="닫기"
      title="사연 요청"
      onClose={() => navigate("..")}
      subtitle="성별을 알려주시면 좋은 사연을 보내드릴게요"
    >
      <SegmentSelector
        options={["여성", "남성"]}
        onSelect={(option) => setGender(option)}
      />
      <form onSubmit={handleFormSubmit}>
        <Button variant="delete">요청하기</Button>
      </form>
    </Modal>
  );
}
type AITrainModalProps = ModalProps;
