import styles from "./PhotoGridModal.module.css";
import Button from "@components/ui/Button";
import Modal, { ModalProps } from "..";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotoList } from "@apis/photo";
import { useParams, useNavigate } from "react-router-dom";

export default function PhotoGridModal({ ...other }: PhotoGridModalProps) {
  const { sequence } = useParams();
  const navigate = useNavigate();
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
    <img
      key={photo.photoId}
      src={photo.photoUrl}
      onClick={() => navigate(":sequence")}
    />
  ));

  return (
    <Modal {...other} buttonLabel="close">
      <p>Photo grid</p>
      {/* TODO: route link */}
      <Button onClick={() => navigate("upload")}>+</Button>
      <div className={styles.photoGrid}>{photos}</div>
      <Button onClick={() => navigate(-1)}>뒤로가기</Button>
    </Modal>
  );
}

type PhotoGridModalProps = ModalProps;
