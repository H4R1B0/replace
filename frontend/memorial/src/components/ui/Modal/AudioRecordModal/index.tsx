import Modal, { ModalProps } from "..";
export default function AudioRecordModal({ ...other }: AudioRecordModalProps) {
  return (
    <Modal {...other} buttonLabel="close">
      <p>AudioRecordModal</p>
    </Modal>
  );
}
type AudioRecordModalProps = ModalProps;
