import styles from "./Textarea.module.css";

interface Textareaprops {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  variant?: string;
  name?: string;
}

export default function Textarea({
  onChange = () => {},
  placeholder = "",
  variant = "regular",
  name = "",
}: Textareaprops) {
  let variantClass;
  switch (variant) {
    case "regular":
      variantClass = styles.regular;
      break;
  }
  return (
    <textarea
      placeholder={placeholder}
      className={`${styles.base} ${variantClass}`}
      onChange={onChange}
      name={name}
    />
  );
}
