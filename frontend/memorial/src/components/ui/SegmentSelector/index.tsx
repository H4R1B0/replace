import { useState } from "react";
import styles from "./SegmentSelector.module.css";

export default function SegmentSelector({
  options,
  onSelect,
}: SegmentSelectorProps) {
  const [selected, setSelected] = useState(options[0]);

  const buttons = options.map((option) => (
    <button
      key={option}
      className={
        styles.option + (option === selected ? " " + styles.selected : "")
      }
      onClick={() => {
        setSelected(option);
        onSelect(option);
      }}
    >
      {option}
    </button>
  ));
  return <div className={styles.outer}>{buttons}</div>;
}

type SegmentSelectorProps = {
  options: string[];
  onSelect: (option: string) => void;
};
