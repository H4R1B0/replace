import Button from "@components/ui/Button";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "..";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteSingleRoom } from "@apis/room";

export default function DeleteRoomConfirmModal() {
  const { sequence } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteRoomMutation = useMutation({
    mutationFn: deleteSingleRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trashcan"] });
    },
  });

  if (typeof sequence === "undefined") return;
  const roomSequence = parseInt(sequence);

  const handleDelete = () => {
    deleteRoomMutation.mutate(roomSequence);
    navigate("..");
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
