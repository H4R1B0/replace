import Modal, { ModalProps } from "..";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotificationList, deleteSingleNotification } from "@apis/push";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import Button from "@components/ui/Button";
import { HiOutlineXCircle } from "react-icons/hi2";

import styles from "./NotificationModal.module.css";

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
    <div className={styles.notificationCard}>
      <div key={notification.id}>
        <HiOutlineXCircle
          className={styles.notificationIcon}
          size={30}
          onClick={() => handleDelete(notification.id)}
        />
        <p className={styles.notificationMent}> 😁{notification.message}</p>
      </div>
      <div className={styles.notificationButton}></div>
    </div>
  ));

  return (
    <Modal
      {...other}
      title="알림을 확인해보세요."
      buttonLabel="close"
      onClose={() => navigate(-1)}
    >
      <div>{notifications}</div>
    </Modal>
  );
}

type NotificationModalProps = ModalProps;
