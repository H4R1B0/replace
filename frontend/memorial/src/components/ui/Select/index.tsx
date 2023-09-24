import { useState, useEffect } from "react";
import styles from "./Select.module.css";

interface OptionProps {
  value: any;
  innertext: any;
  id: number;
}

interface SelectProps {
  name: string;
  children: OptionProps[];
  variant?: string;
  onChange: (name: string, selectedValue: any) => void;
}

export default function Select({
  name,
  children,
  onChange,
  variant = "",
}: SelectProps) {
  let variantClass;
  switch (variant) {
    case "long":
      variantClass = styles.long;
      break;
  }

  const [active, setActive] = useState(false);
  const [selectedText, setSelectedText] = useState("선택하세요.");

  const handleLabelClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이 이벤트가 상위 엘리먼트로 전파되지 않게 합니다.
    setActive(!active);
  };

  const handleOptionClick = (value: any, text: string) => {
    setSelectedText(text);
    setActive(false);
    onChange(name, value);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setActive(false);
    };

    if (active) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [active]);

  return (
    <div className={variantClass} onClick={(e) => e.stopPropagation()}>
      <div className={`${styles.selectBox2} ${active ? styles.active : ""} `}>
        <button className={styles.label} onClick={handleLabelClick}>
          {selectedText}
        </button>
        <ul className={styles.optionList}>
          {children.map((option) => (
            <li
              key={option.id}
              className={styles.optionItem}
              onClick={() => handleOptionClick(option.value, option.innertext)}
            >
              {option.innertext}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
