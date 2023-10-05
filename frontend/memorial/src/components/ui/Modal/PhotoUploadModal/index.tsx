import styles from "./PhotoUploadModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSinglePhoto } from "@apis/photo";

import Button from "@components/ui/Button";
import { useRef, useState } from "react";
import { HiPhoto } from "react-icons/hi2";
import Modal, { ModalProps } from "..";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PhotoUploadModal({ ...other }: PhotoUploadModalProps) {
  const navigate = useNavigate();
  const { sequence } = useParams();
  const roomSequence = parseInt(sequence ?? "");
  const inputEl = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const queryClient = useQueryClient();

  const uploadImageMutation = useMutation({
    mutationFn: uploadSinglePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photoList", roomSequence] });
      toast.success("사진이 성공적으로 업로드 되었습니다");
      navigate("..");
    },
    onError: (error: Error) => {
      if (error.message === "400") {
        toast.error("사진 업로드에 실패하였습니다");
      }
    },
  });

  const handlePreviewClick = () => {
    inputEl.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      setImageSrc(result as string);
    };
    reader.readAsDataURL(file);
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("photo") as File;
    uploadImageMutation.mutate({
      sequence: roomSequence,
      photo: file,
    });
  };

  return (
    <Modal {...other} buttonLabel="close" onClose={() => navigate("..")}>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.uploadPreview} onClick={handlePreviewClick}>
          <HiPhoto />
          {imageSrc && <img src={imageSrc} />}
        </div>
        {/* TODO: 만약 image 모든 형식을 받기 원한다면 image/* 로 accept를 바꿀 것 */}
        <input
          type="file"
          name="photo"
          accept=".jpg,.jpeg"
          style={{ visibility: "hidden" }}
          ref={inputEl}
          onChange={handleFileChange}
        />
        <Button disabled={imageSrc === ""}>Upload</Button>
        <Button type="button" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
      </form>
    </Modal>
  );
}

type PhotoUploadModalProps = ModalProps;
