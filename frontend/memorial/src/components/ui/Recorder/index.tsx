import { useState } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import { HiMicrophone } from "react-icons/hi2";
import { HiStopCircle } from "react-icons/hi2";
import { HiPauseCircle } from "react-icons/hi2";
import { HiPlayCircle } from "react-icons/hi2";
import styles from "./Recorder.module.css";

export default function Recorder() {
  const [recordState, setRecordState] = useState(RecordState.STOP);
  const [audioData, setAudioData] = useState<any>(null);
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

  const handleAudioData = (data: any) => {
    setAudioData(data);
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
            <audio controls src={audioData.url} />
          </div>
        )}
      </div>
      <button onClick={() => console.log("녹음 axios랑 연결하기")}>
        업로드하기
      </button>
    </div>
  );
}
