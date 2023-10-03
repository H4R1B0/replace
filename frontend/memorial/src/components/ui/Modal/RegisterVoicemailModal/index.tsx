import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// import { registVoicemail } from "@apis/payphone";

import Modal from "@components/ui/Modal";
import Recorder from "@components/ui/Recorder";
import Button from "@components/ui/Button";
import { AudioData } from "audio-react-recorder";
import Toast from "react-hot-toast";

type RegisterVoicemailModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RegisterVoicemailModal({
  isOpen,
  onClose,
}: RegisterVoicemailModalProps) {
  const navigate = useNavigate();
  // const QueryClient = useQueryClient();

  const [audioData, setAudioData] = useState<AudioData | null>(null);
  const nowUrl = window.location.href;
  const urlSplit = decodeURIComponent(nowUrl.split("/").pop() ?? "").split("?");
  const houseUserNickname = urlSplit[urlSplit.length - 1];
  const nickname = sessionStorage.getItem("nickname");

  const accessToken = sessionStorage.getItem("accessToken");
  const BASE_URL = import.meta.env.VITE_APP_API_URL;

  const RegistVoicemail = async (audioData: AudioData | null) => {
    if (!audioData) {
      console.error("오디오 데이터가 없습니다.");
      return;
    }
    try {
      const formData = new FormData();
      const requestData = {
        toUserNickname: houseUserNickname,
      };
      formData.append("file", audioData.blob as File);
      formData.append(
        "request",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );
      // console.log("audioData", audioData);
      const response = await fetch(`${BASE_URL}/voicemail`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData, // 수정된 부분
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      onClose(); // 모달을 닫음
      navigate(`/payphone/${nickname}`); // 원하는 페이지로 이동
      Toast.success("음성이 성공적으로 등록되었습니다.", {
        duration: 3000,
      });
      setAudioData(null);
      // 음성 메시지 목록에 데이터 추가
      // const data = await response.json();
      // setVoicemailList((prevVoicemailList) => [
      //   ...prevVoicemailList,
      //   data.Response,
      // ]);
    } catch (error) {
      console.error("에러", error);
    }
  };

  // const uploadRecord = useMutation(registVoicemail, {
  //   onSuccess: () => {
  //     QueryClient.invalidateQueries(["voicemailList"]); // 쿼리를 다시 불러옴
  //     onClose(); // 모달을 닫음
  //     navigate(`/payphone/${nickname}`); // 원하는 페이지로 이동
  //     Toast.success("음성이 성공적으로 등록되었습니다.", {
  //       duration: 3000,
  //     });
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  // const handleUpload = () => {
  //   if (audioData) {
  //     uploadRecord.mutate({
  //       // formData: formData,
  //       request: {
  //         toUserNickname: houseUserNickname,
  //       },
  //       file: audioData.blob as File,
  //     });
  //   }
  // };

  return (
    <Modal
      modalOpen={isOpen}
      onClose={onClose}
      title="이 순간을 음성으로 남기시겠습니까?"
      subtitle="가장 아름다운 목소리를 들려주세요. 등록한 음성은 삭제하실 수 없습니다."
      buttonLabel="닫기"
    >
      <Recorder onAudioDataReceived={(data) => setAudioData(data)} />
      <Button
        onClick={() => {
          RegistVoicemail(audioData);
        }}
      >
        저장하기
      </Button>
    </Modal>
  );
}
