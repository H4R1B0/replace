import Modal, { ModalProps } from "..";
import { useNavigate } from "react-router-dom";
import micsrc from "@assets/Image/mic.png";
import foldersrc from "@assets/Image/folder.png";

export default function AudioOptionModal({ ...other }: AudioOptionModalProps) {
  const navigate = useNavigate();
  return (
    <Modal
      {...other}
      title="전화기"
      subtitle="라디오에서 통화 기록을 확인하세요"
      buttonLabel="닫기"
      onClose={() => navigate("..")}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "1.2rem",
            marginRight: "1.2rem",
            cursor: "pointer",
          }}
          onClick={() => navigate("record")}
        >
          <img src={micsrc} style={{ width: "100%", height: "100%" }} />
          <p>통화하기</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "1.2rem",
            marginRight: "1.2rem",
            cursor: "pointer",
          }}
          onClick={() => navigate("upload")}
        >
          <img src={foldersrc} style={{ width: "100%", height: "100%" }} />
          <p>녹음 남기기</p>
        </div>
      </div>
    </Modal>
  );
}

type AudioOptionModalProps = ModalProps;
