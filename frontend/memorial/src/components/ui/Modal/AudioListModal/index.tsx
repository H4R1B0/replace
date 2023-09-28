import { fetchAudioFileList } from "@apis/audio";
import Modal, { ModalProps } from "..";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function AudioListModal({ ...other }: AudioListModalProps) {
  const navigate = useNavigate();
  const { sequence } = useParams();
  const roomSequence = parseInt(sequence ?? "");

  const {
    isLoading,
    isError,
    data: audioList,
  } = useQuery({
    queryKey: ["audioList", roomSequence],
    queryFn: () => fetchAudioFileList(roomSequence),
  });

  if (isLoading) return "loading";
  if (isError) return `Error`;

  const audios = audioList?.voiceItems?.map((audio) => (
    <audio key={audio.voiceId} controls src={audio.registDate}></audio>
  ));
  return (
    <Modal {...other} buttonLabel="close" onClose={() => navigate("..")}>
      {audios}
    </Modal>
  );
}

type AudioListModalProps = ModalProps;
