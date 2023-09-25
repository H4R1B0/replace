import Button from "@components/ui/Button";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "..";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteSingleRoom } from "@apis/room";
import toast from "react-hot-toast";

export default function DeleteRoomConfirmModal() {
  const { sequence } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteSuccessToast = async () => {
    toast.success("room deleted");
    navigate("/house");
  };

  //TODO: deleteSuccessToast의 duration time이 끝난 뒤에 navigate("/house")로 이동하기
  const deleteRoomMutation = useMutation({
    mutationFn: deleteSingleRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trashcan"] });
      deleteSuccessToast();
    },
  });

  if (typeof sequence === "undefined") return;
  const roomSequence = parseInt(sequence);

  const handleDelete = () => {
    deleteRoomMutation.mutate(roomSequence);
  };
  return (
    <Modal buttonLabel="close">
      <p>Are you sure you want to delete this room?</p>

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
