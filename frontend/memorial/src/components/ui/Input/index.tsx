import styles from "./Input.module.css";

interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  variant?: string;
  name?: string;
}

export default function Input({
  onChange = () => {},
  placeholder = "",
  variant = "regular",
  name = "",
}: InputProps) {
  let variantClass;
  switch (variant) {
    case "regular":
      variantClass = styles.regular;
      break;
  }
  return (
    <input
      placeholder={placeholder}
      className={`${styles.base} ${variantClass}`}
      onChange={onChange}
      name={name}
    />
  );
}
