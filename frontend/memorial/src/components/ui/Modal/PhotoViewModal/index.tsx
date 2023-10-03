import { fetchSinglePhoto } from "@apis/photo";
import Modal, { ModalProps } from "..";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "@components/ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSinglePhoto } from "@apis/photo";
import styles from "./PhotoViewModal.module.css";
import toast from "react-hot-toast";

export default function PhotoViewModal({ ...other }: PhotoViewModalProps) {
  const navigate = useNavigate();
  // TODO: refactor
  const { photoSequence } = useParams();
  const photoId = parseInt(photoSequence ?? "");
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
      toast.success("사진이 성공적으로 삭제되었습니다");
      navigate("..");
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
    <Modal {...other} buttonLabel="close" onClose={() => navigate("..")}>
      <p>Photo view</p>
      <img className={styles.image} src={photo.url} />
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </Modal>
  );
}

type PhotoViewModalProps = ModalProps;
