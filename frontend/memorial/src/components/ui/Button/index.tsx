import styles from "./Button.module.css";

export default function Button({
  variant = "regular",
  children = "",
  ...other
}: ButtonProps) {
  let variantClass;
  switch (variant) {
    case "regular":
      variantClass = styles.regular;
      break;
    case "prominent":
      variantClass = styles.prominent;
      break;
  }
  return (
    <button {...other} className={`${styles.base} ${variantClass}`}>
      {children}
    </button>
  );
}

type ButtonProps = {
  children?: string;
  variant?: "regular" | "prominent";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
