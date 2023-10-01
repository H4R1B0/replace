import { fetchAudioFileList, deleteSingleAudioFile } from "@apis/audio";
import Modal, { ModalProps } from "..";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@components/ui/Button";
import { v4 as uuidv4 } from "uuid";

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
      console.log("delete success");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = (voiceId: number) => {
    if (!voiceId) return;
    console.log(voiceId);
    deleteAudioFileMutation.mutate(voiceId);
  };

  if (isLoading) return "loading";
  if (isError) return `Error`;

  // TODO: 삭제한 이후 리스트 refetching하기, audio.voiceId unique key 문제 해결하기!!!!

  {
    /*TODO: 토글로 누르면 audio가 보이게끔 수정하기 */
  }
  const audios = audioList?.voiceItems?.map((audio) => (
    <div key={uuidv4()}>
      <div>{audio.registDate}</div>
      <Button onClick={() => handleDelete(audio.voiceId)}>삭제하기</Button>
      <audio controls>
        <source src={audio.voiceUrl} type="audio/wav" />
      </audio>
    </div>
  ));
  return (
    <Modal {...other} buttonLabel="close" onClose={() => navigate("..")}>
      {audios}
    </Modal>
  );
}

type AudioListModalProps = ModalProps;
