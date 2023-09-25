import Textarea from ".";

export default {
  title: "UI/Textarea",
  component: Textarea,
};

export const Default = {
  render: () => <Textarea placeholder="이름을 입력해주세요." />,
};

export const regular = {
  render: () => (
    <Textarea
      variant="regular"
      placeholder="이름을 입력해주세요 긴 이름이어도 괜찮으니까"
    />
  ),
};
