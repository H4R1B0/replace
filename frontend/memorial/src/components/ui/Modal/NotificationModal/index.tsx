import Modal, { ModalProps } from "..";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotificationList, deleteSingleNotification } from "@apis/push";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function NotificationModal({
  ...other
}: NotificationModalProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleDelete = (id: number) => {
    deleteNotificationMutation.mutate(id);
  };

  const deleteNotificationMutation = useMutation({
    mutationFn: deleteSingleNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationList"] });
      toast.success("알림이 성공적으로 삭제되었습니다");
    },
    onError: () => {
      toast.error("알림 삭제에 실패하였습니다");
    },
  });

  const {
    isLoading,
    isError,
    data: notificationList,
  } = useQuery({
    queryKey: ["notificationList"],
    queryFn: () => fetchNotificationList(),
  });

  if (isLoading) return "loading";
  if (isError) return `Error`;

  const notifications = notificationList?.data?.map((notification) => (
    <>
      <div key={notification.id}> 😁{notification.message} </div>
      <button onClick={() => handleDelete(notification.id)}>삭제하기</button>
    </>
  ));

  return (
    <Modal {...other} buttonLabel="close" onClose={() => navigate("..")}>
      <p>notificationList</p>
      <div>{notifications}</div>
    </Modal>
  );
}

type NotificationModalProps = ModalProps;
