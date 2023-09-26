import Modal from "."; // 올바른 경로로 수정하세요.

export default {
  title: "UI/Modal",
  component: Modal,
};

export const Default = () => (
  <Modal
    title="모달 제목"
    subtitle="모달 부제목"
    buttonLabel="닫기"
    onClose={() => console.log("모달 닫기")}
  >
    <p>모달 내용이 들어갑니다.</p>
  </Modal>
);

export const WithoutSubtitle = () => (
  <Modal
    title="모달 제목"
    buttonLabel="닫기"
    onClose={() => console.log("모달 닫기")}
  >
    <p>모달 내용이 들어갑니다.</p>
  </Modal>
);
