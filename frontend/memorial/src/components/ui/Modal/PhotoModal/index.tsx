import Modal from "..";
import type { ModalProps } from "..";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotoList } from "@apis/photo";
import styles from "./PhotoModal.module.css";

type PhotoModalProps = {
  roomSequence: number;
} & ModalProps;

export default function PhotoModal({
  roomSequence,
  ...other
}: PhotoModalProps) {
  const {
    isLoading,
    isError,
    data: photoList,
  } = useQuery({
    queryKey: ["photoList", roomSequence],
    queryFn: () => fetchPhotoList(roomSequence),
  });

  if (isLoading) return "loading";
  if (isError) return `Error`;

  const photos = photoList?.photos.map((photo) => (
    <img key={photo.photoId} src={photo.photoUrl} />
  ));
  return (
    <Modal {...other} buttonLabel="close">
      <p>Photo modal</p>
      <div className={styles.photoGrid}>{photos}</div>
    </Modal>
  );
}
