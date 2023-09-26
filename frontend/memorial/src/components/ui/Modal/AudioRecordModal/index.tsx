import Modal, { ModalProps } from "..";
import Recorder from "@components/ui/Recorder";
import { useState } from "react";
import Button from "@components/ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSingleAudio } from "@apis/audio";
import { useParams } from "react-router-dom";
import { AudioData } from "audio-react-recorder";
import { useNavigate } from "react-router-dom";

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
    <Modal {...other} buttonLabel="close" onClose={() => navigate("..")}>
      <p>AudioRecordModal</p>
      <form onSubmit={handleFormSubmit}>
        <Recorder onAudioDataReceived={(data) => setAudioData(data)} />
        <Button type="submit">서버로 저장</Button>
      </form>
    </Modal>
  );
}
type AudioRecordModalProps = ModalProps;
