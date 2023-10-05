import styles from "./Button.module.css";

export default function Button({
  variant = "regular",
  children = "",
  ...other
}: ButtonProps) {
  let variantClass;
  switch (variant) {
    case "modal":
      variantClass = styles.modal;
      break;
    case "regular":
      variantClass = styles.regular;
      break;
    case "prominent":
      variantClass = styles.prominent;
      break;
    case "tributeList":
      variantClass = styles.tributeList;
      break;
    case "tutotial":
      variantClass = styles.tutotial;
      break;
    case "nickname":
      variantClass = styles.nickname;
      break;
    case "delete":
      variantClass = styles.delete;
      break;
    case "dubble":
      variantClass = styles.dubble;
      break;
    case "plus":
      variantClass = styles.plus;
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
  variant?:
    | "modal"
    | "regular"
    | "prominent"
    | "tributeList"
    | "tutotial"
    | "nickname"
    | "delete"
    | "plus"
    | "dubble";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
