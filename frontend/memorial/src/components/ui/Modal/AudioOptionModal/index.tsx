import Modal, { ModalProps } from "..";
import Button from "@components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function AudioOptionModal({ ...other }: AudioOptionModalProps) {
  const navigate = useNavigate();
  return (
    // TODO: 모달을 닫을 때 useHistory를 사용하기
    <Modal {...other} buttonLabel="close">
      <p>AudioOptionModal</p>
      <Button onClick={() => navigate("record")}>녹음하기</Button>
      <Button onClick={() => navigate("upload")}>녹음 업로드하기</Button>
    </Modal>
  );
}

type AudioOptionModalProps = ModalProps;
