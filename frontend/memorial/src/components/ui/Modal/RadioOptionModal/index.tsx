import Modal, { ModalProps } from "..";
import Button from "@components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function RadioOptionModal({ ...other }: RadioOptionModalProps) {
  const navigate = useNavigate();
  return (
    <Modal {...other} buttonLabel="close" onClose={() => navigate("..")}>
      <Button onClick={() => navigate("list")}>음성 파일 리스트 보기 </Button>
      <Button onClick={() => navigate("ai")}>AI 학습 듣기 </Button>
    </Modal>
  );
}

type RadioOptionModalProps = ModalProps;
