import { fetchSinglePhoto } from "@apis/photo";
import Modal, { ModalProps } from "..";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "@components/ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSinglePhoto } from "@apis/photo";

export default function PhotoViewModal({ ...other }: PhotoViewModalProps) {
  const navigate = useNavigate();
  // TODO: refactor
  const { photoId: photoIdString } = useParams();
  const photoId = parseInt(photoIdString ?? "");
  const queryClient = useQueryClient();

  //TODO: hot-toast 생성하고, deletePhotoMutation 성공 시에 toast.success("photo deleted") 띄우기
  const handleDelete = () => {
    deletePhotoMutation.mutate(photoId);
    console.log("success");
  };
  const deletePhotoMutation = useMutation({
    mutationFn: deleteSinglePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photo"] });
      navigate(-2);
    },
  });

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
      <Button onClick={handleDelete}>Delete</Button>
    </Modal>
  );
}

type PhotoViewModalProps = ModalProps;
