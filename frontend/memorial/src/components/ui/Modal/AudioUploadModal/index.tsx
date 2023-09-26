import styles from "./AudioUploadModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSingleAudio } from "@apis/audio";

import Button from "@components/ui/Button";
import { useRef, useState } from "react";
import { HiFolder } from "react-icons/hi2";
import Modal, { ModalProps } from "..";
import { useParams, useNavigate } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

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
    console.log("fomrData", formData);
    console.log(file);
    uploadAudioMutation.mutate({
      sequence: roomSequence,
      audio: file,
    });
  };

  return (
    <Modal {...other} buttonLabel="close" onClose={() => navigate("..")}>
      <p>AudioUploadModal</p>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.uploadPreview} onClick={handlePreviewClick}>
          <HiFolder />
        </div>
        <input
          type="file"
          name="audio"
          accept="audio/*"
          style={{ visibility: "hidden" }}
          ref={inputEl}
          onChange={handleFileChange}
        />
        <Button disabled={audioSrc === ""}>Upload</Button>
        <Button onClick={() => navigate(-1)}>뒤로가기</Button>
      </form>
      {audioSrc && <ReactAudioPlayer src={audioSrc} controls />}
    </Modal>
  );
}
type AudioUploadModalProps = ModalProps;
