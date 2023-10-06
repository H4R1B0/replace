import Modal, { ModalProps } from "..";
import { useNavigate } from "react-router-dom";
import registersrc from "@assets/Image/listen_my_register.png";
import learnedsrc from "@assets/Image/listen_learned.png";

export default function RadioOptionModal({ ...other }: RadioOptionModalProps) {
  const navigate = useNavigate();
  return (
    <Modal
      {...other}
      title="라디오"
      subtitle="라디오를 들으며 편안한 시간을 보내세요"
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
          onClick={() => navigate("list")}
        >
          <img src={registersrc} style={{ width: "100%", height: "100%" }} />
          <p>통화 기록</p>
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
          onClick={() => navigate("ai")}
        >
          <img src={learnedsrc} style={{ width: "100%", height: "100%" }} />
          <p>AI 라디오</p>
        </div>
      </div>
    </Modal>
  );
}

type RadioOptionModalProps = ModalProps;
