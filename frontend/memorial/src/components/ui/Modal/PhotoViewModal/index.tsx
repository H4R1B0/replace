import { fetchSinglePhoto } from "@apis/photo";
import Modal, { ModalProps } from "..";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "@components/ui/Button";

export default function PhotoViewModal({ ...other }: PhotoViewModalProps) {
  const navigate = useNavigate();
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
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Button>Delete</Button>
    </Modal>
  );
}

type PhotoViewModalProps = ModalProps;
