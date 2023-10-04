import Modal, { ModalProps } from "..";
import Button from "@components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function AudioOptionModal({ ...other }: AudioOptionModalProps) {
  const navigate = useNavigate();
  return (
    <Modal
      {...other}
      title="원하는 기능을 선택해주세요."
      buttonLabel="닫기"
      onClose={() => navigate("..")}
    >
      <Button variant="dubble" onClick={() => navigate("record")}>
        녹음하러 가기
      </Button>
      <Button variant="dubble" onClick={() => navigate("upload")}>
        녹음된 파일 업로드하기
      </Button>
    </Modal>
  );
}

type AudioOptionModalProps = ModalProps;
