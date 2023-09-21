import Button from "@components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function TributePage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1> 헌화 페이지</h1>
      <img
        src="https://i.imgur.com/UZrA2j5.png"
        style={{ height: "400px" }}
        alt="door"
      />
      <Button variant="regular" onClick={() => navigate("/tribute/create")}>
        헌화 생성하기
      </Button>
      <Button variant="regular" onClick={() => navigate("/tribute/list")}>
        헌화 리스트 보기
      </Button>
    </div>
  );
}
