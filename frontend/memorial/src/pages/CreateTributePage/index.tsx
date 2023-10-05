import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "@components/ui/Select/index";
import Input from "@components/ui/Input";
import PATH from "@constants/path";
import Button from "@components/ui/Button";
import formatDateToYYYYMMDD from "@mocks/handlers/tributeHandlers";
import styles from "./CreateTributePage.module.css";
import Textarea from "@components/ui/Textarea";
import { useMutation } from "@tanstack/react-query";
import { createTribute } from "@apis/tribute";
import toast from "react-hot-toast";

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

  const navigate = useNavigate();

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

  const tributeMutation = useMutation(createTribute, {
    onSuccess: () => {
      toast.success("헌화 공간 생성이 완료되었습니다."),
        { id: "successSubmit" };
      setTribute({
        title: "",
        subTitle: "",
        description: "",
        startDate: "",
        endDate: "",
      });
      navigate(`${PATH.TRIBUTELIST}`);
    },
    onError: (error: Error) => {
      if (error.message === "400") {
        toast.error("부정적인 단어가 포함되어 있습니다."), { id: "failsubmit" };
      } else {
        console.error("에러 발생", error);
      }
    },
  });

  const tributeSubmit = () => {
    if (tribute.description === "" || tribute.title === "" || tribute.subTitle === "" || tribute.startDate === "") {
      toast.error("모든 항목을 입력해주세요."), { id: "failsubmit" };
    } else {
      tributeMutation.mutate({
        ...tribute,
      });
    }
  };

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
            variant="tribute"
          />
        </div>
        <div className={styles.inputWrapper}>
          <h4 className={styles.subtitleMargin}>추모 기간</h4>
          <Select
            name="day"
            onChange={onChangeTribute}
            children={dayOptions}
            variant="tribute"
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
            헌화 하기
          </Button>
          <Button
            variant="regular"
            onClick={() => navigate(`${PATH.TRIBUTELIST}`)}
          >
            목록 보기
          </Button>
        </div>
      </div>
    </div>
  );
}
