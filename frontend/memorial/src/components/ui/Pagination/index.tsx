import { useNavigate } from "react-router-dom";
import styles from "./Pagination.module.css";

type PaginationProps = {
  prev?: string;
  next?: string;
  prevPath?: string;
  nextPath?: string;
  variant?: "none" | "onlyNext";
};
export default function Pagination({
  prev,
  next,
  prevPath,
  nextPath,
  variant = "none",
}: PaginationProps) {
  const navigate = useNavigate();

  let variantClass;
  switch (variant) {
    case "none":
      variantClass = "";
      break;
    case "onlyNext":
      variantClass = styles.next;
      break;
  }

  return (
    <div className={`${styles.neonTextContainer} ${variantClass}`}>
      {prev && (
        <div
          className={styles.neonText}
          onClick={() => navigate(`${prevPath}`)}
        >
          &lt; {prev}
        </div>
      )}
      {next && (
        <div
          className={styles.neonText}
          onClick={() => navigate(`${nextPath}`)}
        >
          {next} &gt;
        </div>
      )}
    </div>
  );
}
