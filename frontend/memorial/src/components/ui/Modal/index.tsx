import ReactModal from "react-modal";

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
  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Pop up Message"
      shouldCloseOnOverlayClick={false}
    >
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        {children}
        <button onClick={onClose}>{buttonLabel}</button>
      </div>
    </ReactModal>
  );
}
