import Modal, { ModalProps } from "..";
import Recorder from "@components/ui/Recorder";
export default function AudioRecordModal({ ...other }: AudioRecordModalProps) {
  return (
    <Modal {...other} buttonLabel="close">
      <p>AudioRecordModal</p>
      <Recorder onAudioDataReceived={() => {}} />
    </Modal>
  );
}
type AudioRecordModalProps = ModalProps;
