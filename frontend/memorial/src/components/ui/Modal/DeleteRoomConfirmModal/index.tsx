import Button from "@components/ui/Button";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "..";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteSingleRoom } from "@apis/room";
import toast from "react-hot-toast";

export default function DeleteRoomConfirmModal() {
  const { sequence } = useParams();
  if (typeof sequence === "undefined") return;
  const roomSequence = parseInt(sequence);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const nickname = sessionStorage.getItem("nickname");

  const deleteSuccessToast = async () => {
    toast.success("방이 성공적으로 삭제되었습니다"), { id: "roomDeleted" };
    navigate(`/house/${nickname}`);
  };

  const deleteRoomMutation = useMutation({
    mutationFn: deleteSingleRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roomList", nickname] });
      deleteSuccessToast();
    },
    onError: (error: Error) => {
      if (error.message === "400") toast.error("방 삭제에 실패하였습니다");
    },
  });

  const handleDelete = () => {
    deleteRoomMutation.mutate(roomSequence);
  };
  // TODO: 방 주인이면 안뜨도록 예외처리
  return (
    <Modal buttonLabel="close" onClose={() => navigate("..")}>
      <p>정말 방을 지우시겠습니까?</p>

      <Button onClick={handleDelete}>Yes</Button>
      <Button
        onClick={() => {
          navigate("..");
        }}
      >
        No
      </Button>
    </Modal>
  );
}
