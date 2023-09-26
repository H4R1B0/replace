import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "@components/ui/Select/index";
import Input from "@components/ui/Input";
import PATH from "@constants/path";
import Button from "@components/ui/Button";
import formatDateToYYYYMMDD from "@mocks/handlers/tributeHandlers";
import styles from "./CreateTributePage.module.css";
import Textarea from "@components/ui/Textarea";

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

  const BASE_URL = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  // const userToken = sessionStorage.getItem("accessToken");
  const userToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLtmITspIAiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjk2MDQ5MDI1fQ.o0J4hHjslvrCVx78menpOJ7X3QilPTrBpTkryI-fnSs";

  const dayOptions = [];
  for (let i = 1; i <= 30; i++) {
    dayOptions.push({ value: i, innertext: `${i}`, id: i });
  }

  const subTitleOptions = [
    { value: "추모합니다", innertext: "추모합니다.", id: 1 },
    { value: "애도합니다", innertext: "애도합니다.", id: 2 },
  ];

  const onChangeTribute = (name: string, value: any) => {
    const currentDate = new Date();

    let daysToAdd =
      name === "day"
        ? parseInt(value, 10)
        : tribute.endDate
        ? parseInt(tribute.endDate, 10)
        : 0;

    if (name !== "day" && isNaN(daysToAdd)) {
      daysToAdd = 0;
    }

    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + daysToAdd);

    if (name === "day") {
      setTribute({
        ...tribute,
        startDate: formatDateToYYYYMMDD(currentDate),
        endDate: formatDateToYYYYMMDD(endDate),
      });
    } else {
      setTribute({
        ...tribute,
        [name]: value,
      });
    }
  };
  const tributeSubmit = () => {
    fetch(`${BASE_URL}/wreath`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(tribute),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        return res.json();
      })
      .then(() => {
        alert("작성 완료");
        setTribute({
          title: "",
          subTitle: "",
          description: "",
          startDate: "",
          endDate: "",
        });
        navigate(`${PATH.TRIBUTELIST}`);
      })

      .catch((error) => {
        console.error("에러났음~~", error);
      });
  };

  console.log(tribute);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.titleMargin}>소중한 사람을 위한 헌화 공간</h2>
        <div className={styles.inputWrapper}>
          <h4 className={styles.subtitleMargin}>추모 제목</h4>
          <Input
            name="title"
            onChange={(e) => onChangeTribute(e.target.name, e.target.value)}
            placeholder="추모 제목을 입력하세요."
          />
        </div>
        <div className={styles.inputWrapper}>
          <h4 className={styles.subtitleMargin}>추모 문구</h4>
          <Select
            name="subTitle"
            onChange={onChangeTribute}
            children={subTitleOptions}
            variant="long"
          />
        </div>
        <div className={styles.inputWrapper}>
          <h4 className={styles.subtitleMargin}>추모 기간</h4>
          <Select
            name="day"
            onChange={onChangeTribute}
            children={dayOptions}
            variant="long"
          />
        </div>
        <div className={styles.inputWrapper}>
          <h4 className={styles.subtitleMargin}>
            추모 인물에 대한 설명을 작성해주세요.{" "}
          </h4>
          <Textarea
            name="description"
            onChange={(e) => onChangeTribute(e.target.name, e.target.value)}
            placeholder="추모 인물에 대한 설명을 입력하세요."
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button variant="regular" onClick={tributeSubmit}>
            헌화 시작하기
          </Button>
          <Button
            variant="regular"
            onClick={() => navigate(`${PATH.TRIBUTELIST}`)}
          >
            헌화 목록 보기
          </Button>
        </div>
      </div>
    </div>
  );
}
