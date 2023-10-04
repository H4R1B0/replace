import Button from "@components/ui/Button";
import { useNavigate } from "react-router-dom";
import styles from "./TributePage.module.css";
import Pagination from "@components/ui/Pagination";

export default function TributePage() {
  const navigate = useNavigate();
  const nickname = sessionStorage.getItem("nickname");
  return (
    <div className={styles.wrapper}>
      <Pagination prev="공중전화" prevPath={`/payphone/${nickname}`} />

      <img
        src="https://i.imgur.com/UZrA2j5.png"
        alt="door"
        className={styles.img}
      />
      <div className={styles.buttonwrapper}>
        <Button variant="regular" onClick={() => navigate("/tribute/create")}>
          헌화 생성
        </Button>
        <Button variant="regular" onClick={() => navigate("/tribute/list")}>
          헌화 리스트
        </Button>
      </div>
    </div>
  );
}
