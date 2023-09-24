import Modal from "..";
import type { ModalProps } from "..";

type PhotoModalProps = ModalProps;

export default function PhotoModal({ ...other }: PhotoModalProps) {
  return (
    <Modal {...other} buttonLabel="close">
      <p>Photo modal</p>
    </Modal>
  );
}
