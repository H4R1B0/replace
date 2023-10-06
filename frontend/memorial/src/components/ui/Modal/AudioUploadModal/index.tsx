import styles from "./AudioUploadModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSingleAudio } from "@apis/audio";

import Button from "@components/ui/Button";
import { useRef, useState } from "react";
import { HiFolder } from "react-icons/hi2";
import Modal, { ModalProps } from "..";
import { useParams, useNavigate } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import toast from "react-hot-toast";

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
      toast.success("녹음 파일이 성공적으로 업로드 되었습니다");
      navigate("..");
    },
    onError: () => {
      toast.error("녹음 파일 업로드에 실패하였습니다");
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
    // console.log("fomrData", formData);
    // console.log(file);
    uploadAudioMutation.mutate({
      sequence: roomSequence,
      audio: file,
    });
  };

  return (
    <Modal
      {...other}
      title="녹음 남기기"
      subtitle="잠자고 있던 목소리를 올려주세요"
      buttonLabel="닫기"
      onClose={() => navigate("..")}
    >
      {/* <p>AudioUploadModal</p> */}
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
        {/* <Button className={styles.prevBtn} onClick={() => navigate(-1)}>뒤로가기</Button> */}
        <Button variant="delete" disabled={audioSrc === ""}>
          등록하기
        </Button>
      </form>
      {audioSrc && (
        <ReactAudioPlayer src={audioSrc} controls className={styles.player} />
      )}
    </Modal>
  );
}
type AudioUploadModalProps = ModalProps;
