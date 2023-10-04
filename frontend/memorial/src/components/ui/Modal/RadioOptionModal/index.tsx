import Modal, { ModalProps } from "..";
import Button from "@components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function RadioOptionModal({ ...other }: RadioOptionModalProps) {
  const navigate = useNavigate();
  return (
    <Modal
      {...other}
      title="원하는 기능을 선택해주세요."
      buttonLabel="닫기"
      onClose={() => navigate("..")}
    >
      <Button variant="dubble" onClick={() => navigate("list")}>
        내가 남긴 음성 듣기
      </Button>
      <Button variant="dubble" onClick={() => navigate("ai")}>
        학습된 음성 듣기
      </Button>
    </Modal>
  );
}

type RadioOptionModalProps = ModalProps;
