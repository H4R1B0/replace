import ReactModal from "react-modal";
import Button from "../Button";

interface ModalProps {
  modalOpen: boolean;
  onClose: () => void;
  title: string; // 모달 제목
  subtitle?: string; // 모달 부제목(필수 X)
  buttonLabel: string; // 모달 버튼
  children: React.ReactNode; // 모달 내부에 들어갈 모든 내용 <Modal>해당 모달에 넣고 싶은 내용(=children)</Modal> 로 정의해서 사용하기
}

export default function Modal({
  modalOpen,
  onClose,
  title,
  subtitle,
  buttonLabel,
  children,
}: ModalProps) {
  const customModalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      maxWidth: "500px",
      width: "80%",
      height: "auto",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "auto",
    },
  };

  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Pop up Message"
      shouldCloseOnOverlayClick={false}
      style={customModalStyles} // customStyles를 여기에 적용
    >
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        {children}
        <Button variant="regular" onClick={onClose}>
          {buttonLabel}
        </Button>
      </div>
    </ReactModal>
  );
}
