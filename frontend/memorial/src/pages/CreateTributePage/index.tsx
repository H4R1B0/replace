import { useNavigate } from "react-router-dom";
import PATH from "@constants/path";
export default function CreateTributePage() {
  const navigate = useNavigate();
  const days = [];
  for (let i = 1; i <= 30; i++) {
    days.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return (
    <div>
      <h3>소중한 사람을 위한 헌화 공간</h3>

      <p>추모 제목</p>
      <input type="text" />

      <p>추모 기간</p>
      <select name="tributePeriod" id="tributePeriod">
        {days}
      </select>

      <p>추모 제목</p>
      <input type="text" />

      <p>추모 문구</p>
      <input type="text" />

      <p>추모 인물에 대한 설명을 작성해주세요. </p>
      <input type="text" />

      <button>작성 하기</button>
      <button onClick={() => navigate(`${PATH.TRIBUTELIST}`)}>목록 보기</button>
    </div>
  );
}
