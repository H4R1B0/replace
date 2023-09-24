import styles from "./PhotoGridModal.module.css";
import Button from "@components/ui/Button";
import Modal, { ModalProps } from "..";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotoList } from "@apis/photo";
import { useParams } from "react-router-dom";

export default function PhotoGridModal({ ...other }: PhotoGridModalProps) {
  const { sequence } = useParams();
  const roomSequence = parseInt(sequence ?? "");

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
      <p>Photo grid</p>
      {/* TODO: route link */}
      <Button>+</Button>
      <div className={styles.photoGrid}>{photos}</div>
    </Modal>
  );
}

type PhotoGridModalProps = ModalProps;
