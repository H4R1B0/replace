import styles from "./Button.module.css";

export default function Button({
  onClick = () => {},
  variant = "regular",
  children = "",
}) {
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
    <button className={`${styles.base} ${variantClass}`} onClick={onClick}>
      {children}
    </button>
  );
}
