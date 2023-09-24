import { fetchSinglePhoto } from "@apis/photo";
import Modal, { ModalProps } from "..";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function PhotoViewModal({ ...other }: PhotoViewModalProps) {
  // TODO: refactor
  const { photoId: photoIdString } = useParams();
  const photoId = parseInt(photoIdString ?? "");

  const {
    isLoading,
    isError,
    data: photo,
  } = useQuery({
    queryKey: ["photo", photoId],
    queryFn: () => fetchSinglePhoto(photoId),
  });

  if (isLoading) return "loading";
  if (isError) return `Error`;

  return (
    <Modal {...other} buttonLabel="close">
      <p>Photo view</p>
      <img src={photo.photoUrl} />
    </Modal>
  );
}

type PhotoViewModalProps = ModalProps;
