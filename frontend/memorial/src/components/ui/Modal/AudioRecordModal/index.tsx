import Modal, { ModalProps } from "..";
import Recorder from "@components/ui/Recorder";
import { useState } from "react";
import Button from "@components/ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSingleAudio } from "@apis/audio";
import { useParams } from "react-router-dom";
import { AudioData } from "audio-react-recorder";

export default function AudioRecordModal({ ...other }: AudioRecordModalProps) {
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
    <Modal {...other} buttonLabel="close">
      <p>AudioRecordModal</p>
      <form onSubmit={handleFormSubmit}>
        <Recorder onAudioDataReceived={(data) => setAudioData(data)} />
        <Button>서버로 저장</Button>
      </form>
    </Modal>
  );
}
type AudioRecordModalProps = ModalProps;
