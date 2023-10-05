import styles from "./PhotoGridModal.module.css";
import Modal, { ModalProps } from "..";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotoList } from "@apis/photo";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";

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

  console.log(isVisitor);
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
      title="사진첩"
      subtitle="자주 찾는 사진을 남겨보세요"
      buttonLabel="닫기"
      onClose={() => navigate("..")}
    >
      {isVisitor || (
        <div className={styles.buttonSection}>
          <button onClick={() => navigate("upload")} className={styles.button}>
            <HiPlus />
          </button>
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
