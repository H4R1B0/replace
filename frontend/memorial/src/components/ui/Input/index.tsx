import styles from "./Input.module.css";

interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  variant?: string;
  name?: string;
  value?: string;
}

export default function Input({
  onChange = () => {},
  placeholder = "",
  variant = "regular",
  name = "",
  value,
}: InputProps) {
  let variantClass;
  switch (variant) {
    case "regular":
      variantClass = styles.regular;
      break;
    case "short":
      variantClass = styles.short;
      break;
  }
  return (
    <div className={styles.wrapper}>
      <input
        placeholder={placeholder}
        className={`${styles.base} ${variantClass}`}
        onChange={onChange}
        name={name}
        value={value}
      />
    </div>
  );
}
