import { useState } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";

import styles from "./Recorder.module.css";
import { HiMicrophone } from "react-icons/hi2";
import { HiStopCircle } from "react-icons/hi2";
import { HiPauseCircle } from "react-icons/hi2";
import { HiPlayCircle } from "react-icons/hi2";
import AudioPlayer from "../AudioPlayer";

interface RecorderProps {
  onAudioDataReceived: (data: Blob | null) => void;
}

export default function Recorder({ onAudioDataReceived }: RecorderProps) {
  const [recordState, setRecordState] = useState(RecordState.STOP);
  // const [audioData, setAudioData] = useState<Blob | null>(null);
  const [audioData, setAudioData] = useState<any | null>(null);
  const [recordingMessage, setRecordingMessage] = useState(""); // 녹음 상태 메시지

  // 녹음 시작
  const startRecording = () => {
    setAudioData(null);
    setRecordState(RecordState.START);
    setRecordingMessage("녹음 중...");
  };
  // 녹음 중지/끝
  const stopRecording = () => {
    setRecordState(RecordState.STOP);
    setRecordingMessage("");
  };
  // 일시 중지
  const pauseRecording = () => {
    setRecordState(RecordState.PAUSE);
    setRecordingMessage("일시 중지됨");
  };
  // 정지 후 재시작
  const resumeRecording = () => {
    setRecordState(RecordState.RESUME);
    setRecordingMessage("녹음 중...");
  };

  const handleAudioData = (data: Blob) => {
    setAudioData(data);
    onAudioDataReceived(data); // Blob 데이터를 전달합니다.
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <AudioReactRecorder
          state={recordState}
          type={"audio/wav"}
          onStop={handleAudioData}
          backgroundColor="rgb(255,255,255)"
          canvasWidth={200}
          canvasHeight={80}
        />
        {recordingMessage}
      </div>
      <div className={styles.audioRecorder}>
        <button className={styles.recordbtn} onClick={startRecording}>
          <HiMicrophone />
        </button>
        {recordState === RecordState.START && (
          <button className={styles.recordbtn} onClick={pauseRecording}>
            <HiPauseCircle />
          </button>
        )}
        {recordState === RecordState.PAUSE && (
          <button className={styles.recordbtn} onClick={resumeRecording}>
            <HiPlayCircle />
          </button>
        )}
        <button className={styles.recordbtn} onClick={stopRecording}>
          <HiStopCircle />
        </button>
        {audioData && (
          <div>
            <AudioPlayer url={audioData.url} />
          </div>
        )}
      </div>
    </div>
  );
}
