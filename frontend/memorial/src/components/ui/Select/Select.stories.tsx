import Select from ".";

export default {
  title: "UI/Select",
  component: Select,
};

const options = [
  {
    value: 3,
    innertext: "가",
    id: 1,
  },
  {
    value: 4,
    innertext: "나",
    id: 2,
  },
];

export const Default = {
  render: () => (
    <Select
      variant="long"
      name="default"
      onChange={(name, value) => console.log(name, value)}
    >
      {options}
    </Select>
  ),
};

export const WithFewerOptions = {
  render: () => {
    const fewerOptions = [
      {
        value: 5,
        innertext: "다",
        id: 3,
      },
    ];
    return (
      <Select name="fewer" onChange={(name, value) => console.log(name, value)}>
        {fewerOptions}
      </Select>
    );
  },
};

export const WithMoreOptions = {
  render: () => {
    const moreOptions = [
      ...options,
      {
        value: 5,
        innertext: "다",
        id: 3,
      },
      {
        value: 6,
        innertext: "라",
        id: 4,
      },
    ];
    return (
      <Select name="more" onChange={(name, value) => console.log(name, value)}>
        {moreOptions}
      </Select>
    );
  },
};
