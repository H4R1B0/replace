import Modal, { ModalProps } from "..";
import Button from "@components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function AudioOptionModal({ ...other }: AudioOptionModalProps) {
  const navigate = useNavigate();
  return (
    <Modal {...other} buttonLabel="close" onClose={() => navigate("..")}>
      <p>AudioOptionModal</p>
      <Button onClick={() => navigate("record")}>녹음하기</Button>
      <Button onClick={() => navigate("upload")}>녹음 업로드하기</Button>
    </Modal>
  );
}

type AudioOptionModalProps = ModalProps;
