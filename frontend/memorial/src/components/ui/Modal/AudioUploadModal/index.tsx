import styles from "./AudioUploadModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSingleAudio } from "@apis/audio";

import Button from "@components/ui/Button";
import { useRef, useState } from "react";
import { HiPhoto } from "react-icons/hi2";
import Modal, { ModalProps } from "..";
import { useParams, useNavigate } from "react-router-dom";

export default function AudioUploadModal({ ...other }: AudioUploadModalProps) {
  const navigate = useNavigate();
  const { sequence } = useParams();
  const roomSequence = parseInt(sequence ?? "");

  const inputEl = useRef<HTMLInputElement | null>(null);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const queryClient = useQueryClient();

  const uploadAudioMutation = useMutation({
    mutationFn: uploadSingleAudio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audioList", roomSequence] });
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
      setAudioSrc(result as string);
    };
    reader.readAsDataURL(file);
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("audio") as File;
    uploadAudioMutation.mutate({
      sequence: roomSequence,
      audio: file,
    });
  };

  return (
    <Modal {...other} buttonLabel="close">
      <p>AudioUploadModal</p>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.uploadPreview} onClick={handlePreviewClick}>
          <HiPhoto />
          <audio controls>
            <source src={audioSrc} type={audioSrc} />
          </audio>
        </div>
        {/* TODO: 만약 image 모든 형식을 받기 원한다면 image/* 로 accept를 바꿀 것 */}
        <input
          type="file"
          name="photo"
          accept=".wav"
          style={{ visibility: "hidden" }}
          ref={inputEl}
          onChange={handleFileChange}
        />
        <Button disabled={audioSrc === ""}>Upload</Button>
        <Button onClick={() => navigate(-1)}>뒤로가기</Button>
      </form>
    </Modal>
  );
}
type AudioUploadModalProps = ModalProps;
