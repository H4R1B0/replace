import Modal, { ModalProps } from "..";
export default function AudioUploadModal({ ...other }: AudioUploadModalProps) {
  return (
    <Modal {...other} buttonLabel="close">
      <p>AudioUploadModal</p>
    </Modal>
  );
}
type AudioUploadModalProps = ModalProps;
