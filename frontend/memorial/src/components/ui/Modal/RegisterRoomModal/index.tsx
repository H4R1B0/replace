import Modal from "..";
import type { ModalProps } from "..";
import toast from "react-hot-toast";

type RegisterRoomModalProps = {
  onRegister: (targetName: string) => void;
} & ModalProps;

export default function RegisterRoomModal({
  onRegister,
  ...other
}: RegisterRoomModalProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //TODO: currentTarget을 console.log 했을 경우 null이었는데 왜 이후에는 currentTarget을 이용할 수 있는지 궁금하다.
    const formData = new FormData(event.currentTarget);
    const targetName = formData.get("targetName");
    if (typeof targetName !== "string" || targetName === "")
      return toast.error("방의 이름을 입력해주세요");
    onRegister(targetName);
  };
  return (
    <Modal {...other} buttonLabel="close">
      <p>등록하려는 이름 입력하시오</p>
      <form onSubmit={handleSubmit}>
        {/* TOODO: pattern을 이용해서 regex 검사하기 */}
        <input type="text" name="targetName" required />
        <button>Register</button>
      </form>
    </Modal>
  );
}
