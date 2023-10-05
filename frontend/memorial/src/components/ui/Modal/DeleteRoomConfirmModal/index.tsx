import { Fragment } from "react";
import Button from "@components/ui/Button";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "..";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteSingleRoom } from "@apis/room";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import styles from "./DeleteRoomConfirmModal.module.css";

export default function DeleteRoomConfirmModal() {
  const { sequence } = useParams();
  if (typeof sequence === "undefined") return;
  const roomSequence = parseInt(sequence);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { nickname } = useParams();
  const username = nickname ?? "";

  const [isVisitor, setIsVisitor] = useState(false);

  useEffect(() => {
    if (username !== sessionStorage.getItem("nickname")) {
      setIsVisitor(true);
    }
  }, []);

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

  const MyRoom = toast.error("자신의 방은 삭제할 수 없습니다.")
  
  const FriendRoom = toast.error("친구의 방은 삭제할 수 없습니다.")

  const BuildInMyHouse = <Modal
    title="정말 방을 지우시겠습니까?"
    buttonLabel="닫기"
    onClose={() => navigate("..")}
  >
    <div className={styles.buttonSection}>
      <Button variant="delete" onClick={handleDelete}>
        네, 정말 삭제할게요.
      </Button>
    </div>
  </Modal>

  return (
    <Fragment>
      {isVisitor ? FriendRoom : (roomSequence === 1? MyRoom : BuildInMyHouse)}
    </Fragment>
  );
}
