import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PATH from "@constants/path";

type Tribute = {
  title: string;
  subTitle: string;
  description: string;
  startDate: string;
  endDate: string;
};
export default function CreateTributePage() {
  const [tribute, setTribute] = useState<Tribute>({
    title: "",
    subTitle: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const onChangeTribute = (e: any) => {
    setTribute({
      ...tribute,
      [e.target.name]: e.target.value,
      startDate: new Date().toISOString(),
    });
  };

  // const BASE_URL = import.meta.env.VITE_APP_API_URL;

  const navigate = useNavigate();
  const days = [];
  for (let i = 1; i <= 30; i++) {
    days.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  console.log(tribute);

  return (
    <div>
      <h3>소중한 사람을 위한 헌화 공간</h3>

      <p>추모 제목</p>
      <input name="title" type="text" onChange={onChangeTribute} />

      <p>추모 기간</p>
      <select id="day">{days}</select>

      <p>추모 문구</p>
      <select name="subTitle" id="subTitle">
        <option value="추모합니다">추모합니다</option>
        <option value="애도합니다">애도합니다</option>
      </select>

      <p>추모 인물에 대한 설명을 작성해주세요. </p>
      <input name="description" type="text" onChange={onChangeTribute} />

      <button>작성 하기</button>
      <button onClick={() => navigate(`${PATH.TRIBUTELIST}`)}>목록 보기</button>
    </div>
  );
}
