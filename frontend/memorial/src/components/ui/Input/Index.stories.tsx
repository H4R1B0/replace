import Input from ".";

export default {
  title: "UI/Input",
  component: Input,
};

export const Default = {
  render: () => <Input placeholder="이름을 입력해주세요." />,
};

export const regular = {
  render: () => (
    <Input
      variant="regular"
      placeholder="이름을 입력해주세요 긴 이름이어도 괜찮으니까"
    />
  ),
};
