import Button from "@components/ui/Button";
import { useNavigate } from "react-router-dom";
import styles from "./TributePage.module.css";
import Pagination from "@components/ui/Pagination";

export default function TributePage() {
  const navigate = useNavigate();
  const nickname = sessionStorage.getItem("nickname");
  return (
    <div className={styles.wrapper}>
      <div className={styles.listWrapper}>
        <Pagination prev="공중전화" prevPath={`/payphone/${nickname}`} />
        <h1>함께 기리는 추모공간</h1>

        <img
          src="https://i.imgur.com/UZrA2j5.png"
          alt="door"
          className={styles.img}
        />
        <div className={styles.buttonwrapper}>
          <Button variant="regular" onClick={() => navigate("/tribute/create")}>
            공간 만들기
          </Button>
          <Button variant="regular" onClick={() => navigate("/tribute/list")}>
            리스트 보기
          </Button>
        </div>
      </div>
    </div>
  );
}
