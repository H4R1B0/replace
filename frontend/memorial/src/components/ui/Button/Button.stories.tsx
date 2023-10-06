import Button from ".";

export default {
  title: "UI",
  component: Button,
};

export const Default = {
  render: () => <Button>Click Me</Button>,
};

export const Regular = {
  render: () => <Button variant="regular">Click Me</Button>,
};

export const Prominent = {
  render: () => <Button variant="prominent">Click Me</Button>,
};
