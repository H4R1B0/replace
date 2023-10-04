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

  const photos = photoList?.data?.map((photo) => (
    <img
      key={photo.id}
      src={photo.url}
      onClick={() => navigate(`${photo.id}`)}
    />
  ));

  return (
    <Modal
      {...other}
      title="남긴 추억을 함께 볼까요."
      buttonLabel="닫기"
      onClose={() => navigate("..")}
    >
      {/* TODO: route link */}

      <div className={styles.buttonSection}>
        {/* <Button onClick={() => navigate(-1)}>뒤로가기</Button> */}
        <Button variant="nickname" onClick={() => navigate("upload")}>
          사진 남기기
        </Button>
      </div>
      {photoList?.data?.length === 0 && (
        <div className={styles.photoMent}>
          <p>아직 사진이 없어요.</p>
          <p>사진을 남겨주세요.</p>
        </div>
      )}
      <div className={styles.photoGrid}>{photos}</div>
    </Modal>
  );
}

type PhotoGridModalProps = ModalProps;
