import Modal, { ModalProps } from "..";
import Recorder from "@components/ui/Recorder";
import { useState } from "react";
import Button from "@components/ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSingleAudio } from "@apis/audio";
import { useParams } from "react-router-dom";
import { AudioData } from "audio-react-recorder";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AudioRecordModal({ ...other }: AudioRecordModalProps) {
  const navigate = useNavigate();
  const { sequence } = useParams();
  const roomSequence = parseInt(sequence ?? "");
  const queryClient = useQueryClient();
  const [audioData, setAudioData] = useState<AudioData | null>(null);

  const uploadAudioMutation = useMutation({
    mutationFn: uploadSingleAudio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audioList", roomSequence] });
      toast.success("녹음 파일이 성공적으로 업로드 되었습니다");
      navigate("..");
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!audioData) return;
    uploadAudioMutation.mutate({
      sequence: roomSequence,
      audio: audioData.blob as File,
    });
  };

  return (
    <Modal
      {...other}
      title="추억을 남겨보세요."
      subtitle="버튼을 눌러 녹음을 진행해주세요."
      buttonLabel="닫기"
      onClose={() => navigate("..")}
    >
      <form onSubmit={handleFormSubmit}>
        <Recorder onAudioDataReceived={(data) => setAudioData(data)} />
        <Button variant="delete" type="submit">
          저장하기
        </Button>
      </form>
    </Modal>
  );
}
type AudioRecordModalProps = ModalProps;
