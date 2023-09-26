import ReactModal from "react-modal";
import Button from "../Button";

export type ModalProps = {
  modalOpen?: boolean;
  onClose?: () => void;
  title?: string; // 모달 제목
  subtitle?: string; // 모달 부제목(필수 X)
  buttonLabel?: string; // 모달 버튼
  children?: React.ReactNode; // 모달 내부에 들어갈 모든 내용 <Modal>해당 모달에 넣고 싶은 내용(=children)</Modal> 로 정의해서 사용하기
};

export default function Modal({
  modalOpen = true,
  onClose,
  title,
  subtitle,
  buttonLabel,
  children,
}: ModalProps) {
  // TODO: scrollbar styles
  const customModalStyles: ReactModal.Styles = {
    overlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "none",
      backgroundColor: " rgba(0, 0, 0, 0.4)",
    },
    content: {
      margin: "10%",
      maxWidth: "calc(800px - 10%)", // TODO: use CSS variable
      maxHeight: "80vh",
      backgroundColor: "rgba(255,255,255,0.5)",
      backdropFilter: "blur(15px)",
      WebkitBackdropFilter: "blur(15px)",
      border: "none",
      borderRadius: "10px",
      position: "unset",
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
