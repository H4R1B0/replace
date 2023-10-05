import styles from "./PhotoGridModal.module.css";
import Button from "@components/ui/Button";
import Modal, { ModalProps } from "..";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotoList } from "@apis/photo";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PhotoGridModal({ ...other }: PhotoGridModalProps) {
  const { sequence } = useParams();
  const navigate = useNavigate();
  const roomSequence = parseInt(sequence ?? "");
  const { nickname } = useParams();
  const username = nickname ?? "";
  const [isVisitor, setIsVisitor] = useState(false);

  useEffect(() => {
    if (username !== sessionStorage.getItem("nickname")) {
      setIsVisitor(true);
    }
  }, []);

  const {
    isLoading,
    isError,
    data: photoList,
  } = useQuery({
    queryKey: ["photoList", roomSequence],
    queryFn: () => fetchPhotoList(username, roomSequence),
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
      {isVisitor || (
        <div className={styles.buttonSection}>
          <Button variant="nickname" onClick={() => navigate("upload")}>
            사진 남기기
          </Button>
        </div>
      )}
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
