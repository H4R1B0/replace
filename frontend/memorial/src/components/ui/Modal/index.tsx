import ReactModal from "react-modal";
import Button from "../Button";

export type ModalProps = {
  modalOpen?: boolean;
  onClose?: () => void;
  title?: string; // 모달 제목
  subtitle?: string; // 모달 부제목(필수 X)
  buttonLabel?: string; // 모달 버튼
  buttonLabelDubble?: string; // 모달 버튼
  children?: React.ReactNode; // 모달 내부에 들어갈 모든 내용 <Modal>해당 모달에 넣고 싶은 내용(=children)</Modal> 로 정의해서 사용하기
  noButton?: boolean; //닫기 버튼이 필요 없는 모달에 사용함. noButton={true}를 전달하면 버튼 사라짐
};

export default function Modal({
  modalOpen = true,
  onClose,
  title,
  subtitle,
  buttonLabel,
  buttonLabelDubble,
  children,
  noButton,
}: ModalProps) {
  // TODO: scrollbar styles
  const customModalStyles: ReactModal.Styles = {
    overlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "none",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
    },
    content: {
      margin: "10%",
      maxWidth: "calc(800px - 10%)", // TODO: use CSS variable
      maxHeight: "80vh",
      backgroundColor: "rgba( 255, 255, 255, 0.8 )",
      border: "none",
      borderRadius: "0.7rem",
      position: "unset",
      overflowX: "hidden",
      overflowY: "auto",
      padding: "2rem",
    },
  };

  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Pop up Message"
      shouldCloseOnOverlayClick={false}
      style={customModalStyles}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          margin: "auto",
          textAlign: "center", // 모달 내 컨텐츠 중앙정렬
        }}
      >
        <div style={{ marginBottom: "0.5rem" }}>
          <h2>{title}</h2>
        </div>
        {subtitle && <p style={{ color: "rgb(58, 45, 45)" }}>{subtitle}</p>}
        <br />
        {children}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: "0.5rem",
          }}
        >
          {!noButton && (
            <Button variant="modal" onClick={onClose}>
              {buttonLabel}
            </Button>
          )}
          {buttonLabelDubble && (
            <Button
              style={{ backgroundColor: "rgb(171 180 218)" }}
              variant="modal"
              onClick={onClose}
            >
              {buttonLabelDubble}
            </Button>
          )}
        </div>
      </div>
    </ReactModal>
  );
}
